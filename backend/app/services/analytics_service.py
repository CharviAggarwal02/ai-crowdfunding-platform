import pandas as pd

df=pd.read_csv("ml/dataset/kickstarter.csv")

def category_success_rate():

    result=df.groupby("category")["state"].apply(
        lambda x:(x=="successful").mean()
    )

    return result.sort_values(ascending=False).head(5).to_dict()