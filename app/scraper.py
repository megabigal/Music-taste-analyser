import requests
from bs4 import BeautifulSoup
from urllib import parse
from functools import lru_cache
def getArtistId(Artist):
    formatted = parse.quote(Artist)
    url = f"https://www.allmusic.com/search/artists/{formatted}"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',

    }
    response = requests.get(url = url,headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    print(Artist)
    first = soup.select_one(".name a")
    href = first.get("href","")
    print("***")
    id = href.split("mn")[-1] #all id's start with mn
    return id

def getArtistUrl(Artist):
    id = getArtistId(Artist)
    formatted = Artist.lower().replace(" ", "-")
    return f"https://www.allmusic.com/artist/{formatted}-mn{id}"

@lru_cache(maxsize=1000)
def scrapeAllMusic(Artist):
    try:
        artisturl = getArtistUrl(Artist)
        url = artisturl + "/moodsThemesAjax"
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0 Safari/537.36',
            'Referer': artisturl,#ensures i'm accessing data from the artist page
            'X-Requested-With': 'XMLHttpRequest',  #used for ajax requests so the correct html snipped is retyrned
        }

        response = requests.get(url = url,headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        moodLinks = soup.find(id='moodsGrid')
        themeLinks = soup.find(id='themesGrid')

        moods = set()
        themes = set()
        if moodLinks:
            for i in moodLinks.find_all('a'):
                moods.add(i.get("title",""))
        if themeLinks:
            for i in themeLinks.find_all('a'):
                themes.add(i.get("title",""))
    #  print(themes)
        #want to grab the artist styles foo

        response = requests.get(url=artisturl,headers=headers)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        styles =  [a.get_text() for a in soup.select(".styles a")]
        return {"moods":moods, "themes":themes, "styles":styles}
    except:
        print("could not get")
#scrapeAllMusic("cities aviv")
