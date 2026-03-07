import joblib

model = joblib.load("ml/model.pkl")

def predict_success(goal, backers, duration):

    probability = model.predict_proba(
        [[goal, backers, duration]]
    )[0][1]

    return round(probability*100,2)