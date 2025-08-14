import pandas as pd
import joblib
import json
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity



data = pd.read_csv(r'data/movies.csv', encoding='ISO-8859-1')
data2 = pd.read_csv(r'data/Dataframe1.csv', encoding='ISO-8859-1')



data['movieId'] = data['movieId'].astype(str) 
data2['movieId'] = data2['movieId'].astype(str)
data2['userId'] = data2['userId'].astype(str)


algo = joblib.load('model2.pkl')



user_rated_movies = defaultdict(set)
for _, row in data2.iterrows():
    user_rated_movies[row['userId']].add(row['movieId'])


data['genres'] = data['genres'].fillna('').str.replace('|', ' ', regex=False)
data['combined'] = data['title'] + " " + data['genres']
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(data['combined'])
cos_sim_matrix = cosine_similarity(tfidf_matrix)

movie_id_to_index = {str(mid): idx for idx, mid in enumerate(data['movieId'])}
index_to_movie_id = {idx: str(mid) for idx, mid in enumerate(data['movieId'])}


for target_user in data2['userId'].unique():
    recommendations = []
    rated = user_rated_movies[target_user]

    candidate_movies = [mid for mid in data['movieId'].unique() if mid not in rated]

    for movie_id in candidate_movies:
        pred = algo.predict(target_user, movie_id)
        recommendations.append((movie_id, pred.est))


    recommendations.sort(key=lambda x: x[1], reverse=True)
    top_n = recommendations[:5]

    hybrid_results = []

    for movie_id, svd_pred in top_n:
        
        try:
            idx = movie_id_to_index[movie_id]
        except KeyError:
            continue 

        content_scores = cos_sim_matrix[idx]

 
        similar_indices = np.argsort(content_scores)[::-1][1:6]
        content_score_avg = np.mean(content_scores[similar_indices])

        
        svd_score = round((svd_pred - 1) / 4, 2)

       
        hybrid_score = round((svd_score + content_score_avg) / 2, 2)

        title = data.loc[data['movieId'] == movie_id, 'title'].values[0]
        hybrid_results.append((title, hybrid_score))

print("Trained the Model !")
    # for title, score in hybrid_results:
    #     print(f"{title} -  Hybrid Score: {score}")
