import requests
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

api = "798637805be3797fd3e6d591fd0f7d17"
secret = "dd3ebbd3e38c5c5b6b020194cdcbf9f6"
username = "megabigal"


url = f"http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user={username}&api_key={api}&format=json&limit=50"
res = requests.get(url)
data = res.json()

def getTrackTags(track, artist):
    url = f"http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist={artist}&track={track}&api_key={api}&format=json"
    res = requests.get(url)
    tagData = res.json()
    try:
        tagList = tagData.get("toptags", {}).get("tag", [])
        tags = [tag["name"] for tag in tagList if int(tag.get("count",0) > 10)] #grabs all the top tags that have been voted more than 10 times
    except:
        print("error processing track")
    return tags
def formTrackData(data):
    trackData = []
    for i in data["toptracks"]["track"]:
        name = i["name"]
        artist = i["artist"]["name"]
        trackData.append({"track":name,"artist":artist,"tags":getTrackTags(name,artist) })

    trackData = pd.DataFrame(trackData)
    trackData["tags"] = trackData["tags"].apply(lambda tags: " ".join(tags)) #preprocessing the tags into a  better format
    return trackData

trackData = formTrackData(data)
print(trackData)
#tfidf = TfidfVectorizer()
#vectors = tfidf.fit_transform(trackData["tags"])

#similarity = cosine_similarity(vectors)

#s#imularityFrame = pd.DataFrame(similarity, index=trackData["track"], columns=trackData["track"])
#print(simularityFrame )
