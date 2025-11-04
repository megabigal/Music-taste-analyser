#file to manage lastfm imports
import os
import requests
from dotenv import load_dotenv
import pandas as pd
from app.scraper import scrapeAllMusic
from concurrent.futures import ThreadPoolExecutor, as_completed
from functools import lru_cache
load_dotenv()
api = os.getenv("lastfmApiKey")

def getTopTracks(username,limit, timeframe):
    url = "http://ws.audioscrobbler.com/2.0/"
    print("**************")
    print(username)
    params = {
        "method": "user.gettoptracks",
        "user": username,
        "api_key": api,
        "format": "json",
        "limit": limit,
        "period": timeframe
    }
    response = requests.get(url,params=params)
    data = response.json()
    return data

def getMusicBrainzTags(track,artist):
    url = "https://musicbrainz.org/ws/2/recording/"
    query = f'recording:"{track}" AND artist:"{artist}"'
    params = {
        "query": query,
        "fmt": "json"
    }
    try:
        res = requests.get(url, params=params)
        id= res["recordings"][0]["id"]#need to get the track id
        url = f"https://musicbrainz.org/ws/2/recording/{id}"
        params = {"inc": "tags", "fmt": "json"}
        res = requests.get(url, params=params).json()
        return [tag["name"] for tag in res.get("tags", [])]
    except:
        return []
    

def getTrackTags(track, artist):
    url = f"http://ws.audioscrobbler.com/2.0/?method=track.gettoptags&artist={artist}&track={track}&api_key={api}&format=json"
    
    try:
        res = requests.get(url)
        tagData = res.json()
        if track == "Gazin\'":
            print(tagData)
        tagList = tagData.get("toptags", {}).get("tag", [])
        tags = [tag["name"] for tag in tagList if int(tag.get("count",0) >= 1)] #grabs all the top tags that have been voted more than 5 times
        return tags
    except:
        print("error processing track")
        return []
def processTrack(name, artist):
    tags = getTrackTags(name,artist)
        
    allmusic = scrapeAllMusic(artist)
    if allmusic:
        tags.extend(allmusic["styles"])
        tags.extend(allmusic["themes"])
        tags.extend(allmusic["moods"])
    
    
    brainzTags = getMusicBrainzTags(name,artist)
    for i in brainzTags:
        if i not in tags:
            tags.append(i)
    if not tags:
        return None
    return {"track":name,"artist":artist,"tags": tags }
def formTrackData(data):
    tracks = data["toptracks"]["track"]
    results = []

    with ThreadPoolExecutor(max_workers=10) as executor: #opens 10 threads
        futures = [executor.submit(processTrack, t["name"],t["artist"]["name"]) for t in tracks]
        for future in as_completed(futures):
            result = future.result()
            if result:
                results.append(result)
    

    trackData = pd.DataFrame(results)
    trackData["tags"] = trackData["tags"].apply(lambda tags: " ".join(tags)) #preprocessing the tags into a  better format
    
    return trackData