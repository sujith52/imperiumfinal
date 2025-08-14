import pandas as pd
data1_modi=pd.read_csv('movies.csv')
data2_modi=pd.read_csv('ratings.csv')


# print(data1_modi.head)
data2_modi=data2_modi.drop(columns='timestamp')
print(data2_modi.columns)

data2_modi.to_csv('Dataframe1.csv',index=False)

