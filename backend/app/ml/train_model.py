import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from preprocess import load_dataset

df = load_dataset()

X = df[["goal","backers","duration"]]
y = df["successful"]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = RandomForestClassifier(n_estimators=200)

model.fit(X_train, y_train)

BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, "model.pkl")

joblib.dump(model, MODEL_PATH)

print("Model trained successfully")