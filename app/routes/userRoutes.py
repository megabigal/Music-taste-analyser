from flask import Blueprint,  request,  url_for, session, jsonify
from app.lastfm import getTopTracks, formTrackData
from app.recommender import recommend
api = Blueprint("api", __name__)

@api.route("/api/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
            
    session["username"] = username  # stores in the session
    return jsonify({"message": "Login successful", "username": username})



@api.route("/api/trackData")
def dashboard():
    
    username = request.args.get("username")
    
    limit = request.args.get("limit", 10, type=int)
    timeframe = request.args.get("timeframe", "7day")

    
    topTracks = getTopTracks(username, limit, timeframe)
    
    trackData = formTrackData(topTracks)
    
    data = recommend(trackData)
    jsonData = data.reset_index().to_dict(orient="records")
    return jsonify(jsonData)


    
