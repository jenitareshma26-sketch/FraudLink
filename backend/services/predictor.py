import os
import joblib
import numpy as np
from typing import Dict

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'fraud_model.pkl')

class Predictor:
    def __init__(self):
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model not found at {MODEL_PATH}. Train a model with backend/train_model.py")
        self.model = joblib.load(MODEL_PATH)

    def featurize(self, payload: Dict) -> np.ndarray:
        # Simple feature encoding for prototype
        amount = float(payload.get('amount', 0))
        tx_freq = int(payload.get('transaction_frequency', 0))
        account_age = int(payload.get('account_age_days', 0))
        prev_fraud = int(payload.get('previous_fraud_count', 0))

        # categorical encoding (very simple: hash mod)
        device = payload.get('device', 'unknown')
        location = payload.get('location', 'unknown')
        merchant = payload.get('merchant_category') or 'unknown'

        def cat_hash(s: str):
            return abs(hash(s)) % 1000 / 1000.0

        features = [
            amount,
            tx_freq,
            account_age,
            prev_fraud,
            cat_hash(device),
            cat_hash(location),
            cat_hash(merchant),
        ]
        return np.array(features).reshape(1, -1)

    def predict(self, payload: Dict) -> Dict:
        x = self.featurize(payload)
        proba = float(self.model.predict_proba(x)[0, 1])
        risk_score = int(round(proba * 100))
        prediction = 'fraud' if proba >= 0.5 else 'legit'
        if risk_score >= 80:
            risk_level = 'HIGH'
        elif risk_score >= 50:
            risk_level = 'MEDIUM'
        else:
            risk_level = 'LOW'

        return {
            'prediction': prediction,
            'risk_score': risk_score,
            'fraud_probability': proba,
            'risk_level': risk_level,
        }
