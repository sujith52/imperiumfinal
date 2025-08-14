from surprise import SVD,accuracy,Dataset,Reader
from surprise.model_selection import train_test_split
import joblib
import pandas as pd
reader=Reader(rating_scale=(1,5))
train_df=pd.read_csv('Dataframe1.csv')
train_df['userId'] = train_df['userId'].astype(str)
train_df['movieId'] = train_df['movieId'].astype(str)

Data_load=Dataset.load_from_df(train_df[['userId', 'movieId', 'rating']], reader)

# Data_load_for_prediction=Dataset.load_from_df(allmoviedata[['title','genres']], reader)
training_data , testing_data =train_test_split(Data_load,test_size=0.25)
algo=SVD(n_factors=100,n_epochs=20,lr_all=0.005,reg_all=0.02)
algo.fit(training_data)

joblib.dump(algo,'model2.pkl')

predictions=algo.test(testing_data)
result=accuracy.rmse(predictions)
percentage_error = (result / 4) * 100
print(percentage_error)

