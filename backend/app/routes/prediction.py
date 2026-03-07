from fastapi import APIRouter
from app.services.ai_service import predict_success

router = APIRouter()

@router.post("/predict")

def predict(goal:float, backers:int, duration:int):

    probability = predict_success(goal,backers,duration)

    return {
        "success_probability": probability
    }