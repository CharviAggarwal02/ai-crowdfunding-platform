from fastapi import APIRouter
from ..services.ai_prediction import predict_success

router = APIRouter()

@router.post("/predict")
def predict(data: dict):
    result = predict_success(data)
    return {"prediction": result}