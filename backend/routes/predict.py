from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

class PredictRequest(BaseModel):
    amount: float
    device: str
    location: str
    merchant_category: Optional[str] = None
    transaction_time: Optional[str] = None
    transaction_frequency: Optional[int] = 0
    account_age_days: Optional[int] = 0
    previous_fraud_count: Optional[int] = 0

router = APIRouter()

@router.post('/predict')
def predict(req: PredictRequest):
    try:
        from services.predictor import Predictor
        pred = Predictor()
        result = pred.predict(req.dict())
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
