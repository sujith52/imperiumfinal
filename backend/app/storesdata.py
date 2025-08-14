import pandas as pd
import joblib
import json
import redis
from collections import defaultdict

data = pd.read_csv('movies.csv')
data2 = pd.read_csv('Dataframe1.csv')
data['movieId'] = data['movieId'].astype(str) 
data2['movieId'] = data2['movieId'].astype(str)
data2['userId'] = data2['userId'].astype(str)


algo = joblib.load('model2.pkl') 


user_rated_movies = defaultdict(set)
for _, row in data2.iterrows():
    user_rated_movies[row['userId']].add(row['movieId'])


train_movie_ids = data2['movieId'].unique()


# r = redis.Redis(host='localhost', port=6379, db=1)


for target_user in data2['userId'].unique():
    recommendations = []
    already_rated = user_rated_movies[target_user]
    

    candidate_movies = [mid for mid in train_movie_ids if mid not in already_rated]
    
    for movie_id in candidate_movies:
        pred= algo.predict(target_user, movie_id)
       
        recommendations.append((movie_id, pred.est))
    
    recommendations.sort(key=lambda x: x[1], reverse=True)
    top_10 = recommendations[:10]
    
    rec_list = []
    
    for movie_id, predicted_rating in top_10:
        title = data[data['movieId'] == movie_id]['title'].values[0]

        rec_list.append({"title": title, "rating": round((predicted_rating-1)/4, 2)})
    

    # redis_key = f"user:{target_user}:recommendations"
    # r.set(redis_key, json.dumps(rec_list))

print(rec_list)