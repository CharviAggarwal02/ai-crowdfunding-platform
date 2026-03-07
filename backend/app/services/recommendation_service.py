import pandas as pd

def recommend(startups):

    df=pd.DataFrame(startups)

    df["score"]=(
        df["success_probability"]*0.7 +
        df["backers"]*0.3
    )

    df=df.sort_values(by="score",ascending=False)

    return df.head(5).to_dict(orient="records")