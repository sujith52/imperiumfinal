import pandas as pd
import joblib
import json
from collections import defaultdict
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity



data = pd.read_csv(r'C:\Users\sujit\world\imperiumfinal\backend\app\data\movies.csv', encoding='ISO-8859-1')
data2 = pd.read_csv(r'C:\Users\sujit\world\imperiumfinal\backend\app\data\Dataframe1.csv', encoding='ISO-8859-1')



data['movieId'] = data['movieId'].astype(str) 
data2['movieId'] = data2['movieId'].astype(str)
data2['userId'] = data2['userId'].astype(str)


algo = joblib.load(r'C:\Users\sujit\world\imperiumfinal\backend\app\model2.pkl')



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

print(" Trained the Model & Generated Recommendations!")
for title, score in hybrid_results:
    print(f"{title} - Hybrid Score: {score}")
from surprise import Dataset, Reader, accuracy
from surprise.model_selection import train_test_split

print("\n Evaluating Model Performance...")


reader = Reader(rating_scale=(0.5, 5))  
dataset = Dataset.load_from_df(data2[['userId', 'movieId', 'rating']], reader)

trainset, testset = train_test_split(dataset, test_size=0.2)


predictions = algo.test(testset)


rmse = accuracy.rmse(predictions, verbose=False)
mae = accuracy.mae(predictions, verbose=False)
print(f" RMSE: {rmse:.4f}, MAE: {mae:.4f}")


def precision_recall_at_k(predictions, k=5, threshold=3.5):
    """Return precision and recall at k metrics for each user"""
    user_est_true = defaultdict(list)
    for uid, _, true_r, est, _ in predictions:
        user_est_true[uid].append((est, true_r))

    precisions, recalls = {}, {}

    for uid, user_ratings in user_est_true.items():
        user_ratings.sort(key=lambda x: x[0], reverse=True)
        n_rel = sum((true_r >= threshold) for (_, true_r) in user_ratings)
        n_rec_k = sum((est >= threshold) for (est, _) in user_ratings[:k])
        n_rel_and_rec_k = sum(((true_r >= threshold) and (est >= threshold))
                              for (est, true_r) in user_ratings[:k])

        precisions[uid] = n_rel_and_rec_k / n_rec_k if n_rec_k != 0 else 0
        recalls[uid] = n_rel_and_rec_k / n_rel if n_rel != 0 else 0

    precision = sum(prec for prec in precisions.values()) / len(precisions)
    recall = sum(rec for rec in recalls.values()) / len(recalls)
    return precision, recall

precision, recall = precision_recall_at_k(predictions, k=5, threshold=3.5)
print(f" Precision@5: {precision:.4f}, Recall@5: {recall:.4f}")
