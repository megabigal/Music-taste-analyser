from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pandas as pd

def recommend(data):
    tfidf = TfidfVectorizer()
    vectors = tfidf.fit_transform(data["tags"])

    similarity = cosine_similarity(vectors)
    
    similarityFrame = pd.DataFrame(similarity, index=data["track"].values,columns=data["track"].values
)
    
    return similarityFrame
