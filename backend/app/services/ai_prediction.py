import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "ml", "models", "model.pkl")

model = None

if os.path.exists(MODEL_PATH):
    model = joblib.load(MODEL_PATH)
    print("✅ Model loaded")
else:
    print("⚠️ Model file not found. Prediction API disabled.")

def predict_success(data: dict):
    
    if model is None:
        return "Prediction model unavailable"

    goal = data.get("goal", 0)
    duration = data.get("duration", 0)

    prediction = model.predict([[goal, duration]])

    return int(prediction[0])

# import joblib
# import os

# # Get current directory
# BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# # Correct path to model
# MODEL_PATH = os.path.join(BASE_DIR, "ml", "models", "model.pkl")

# model = joblib.load(MODEL_PATH)


# def predict_success(data: dict):
#     goal = data.get("goal", 0)
#     duration = data.get("duration", 0)

#     prediction = model.predict([[goal, duration]])

#     return int(prediction[0])