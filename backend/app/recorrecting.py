import pandas as pd

df = pd.read_csv('Userdata.csv', quotechar='"', skipinitialspace=True)


df['genre'] = df['genre'].astype(str).str.strip().str.replace(r',\s*', ', ', regex=True)

df['genre'] = df['genre'].str.split(', ')
# print(df['genre'])

df_exploded = df.explode('genre')
# print(df_exploded)
user_genre_matrix = df_exploded.pivot_table(index='user', columns='genre', values='rating', aggfunc='mean', fill_value=0)

print(user_genre_matrix)