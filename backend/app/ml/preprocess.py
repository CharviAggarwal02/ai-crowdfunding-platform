import pandas as pd
import os
def load_dataset():

    BASE_DIR = os.path.dirname(__file__)
    DATA_PATH = os.path.join(BASE_DIR, "dataset", "kickstarter.csv")
    df = pd.read_csv(DATA_PATH)

    df = df[df["state"].isin(["successful","failed"])]

    df["successful"] = df["state"].apply(
        lambda x: 1 if x=="successful" else 0
    )

    df["duration"] = (
        pd.to_datetime(df["deadline"]) -
        pd.to_datetime(df["launched"])
    ).dt.days

    df = df[["goal","backers","duration","successful"]]

    return df