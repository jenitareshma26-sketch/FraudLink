"""
Train a simple RandomForest model on synthetic data and save to models/fraud_model.pkl
Run: python backend/train_model.py
"""
import os
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

OUT_DIR = os.path.join(os.path.dirname(__file__), 'models')
os.makedirs(OUT_DIR, exist_ok=True)
MODEL_PATH = os.path.join(OUT_DIR, 'fraud_model.pkl')

# Create synthetic dataset
N = 5000
np.random.seed(42)
amount = np.random.exponential(scale=2000, size=N)
transaction_frequency = np.random.poisson(lam=2, size=N)
account_age = np.random.randint(1, 3650, size=N)
previous_fraud_count = np.random.binomial(1, 0.02, size=N)

devices = np.random.choice(['known', 'new_device', 'suspicious_device'], size=N, p=[0.8,0.15,0.05])
locations = np.random.choice(['home', 'work', 'high_risk_country', 'unknown'], size=N, p=[0.6,0.2,0.05,0.15])
merchant = np.random.choice(['grocery','electronics','luxury','transfer'], size=N)

# Simple heuristics to create labels
fraud_prob = (
    (amount > 10000).astype(int) * 0.5 +
    (devices == 'new_device').astype(int) * 0.2 +
    (locations == 'high_risk_country').astype(int) * 0.25 +
    (previous_fraud_count > 0).astype(int) * 0.6 +
    (transaction_frequency > 10).astype(int) * 0.3
)

fraud_prob = np.clip(fraud_prob, 0, 1)
labels = (np.random.rand(N) < fraud_prob).astype(int)

# Feature engineering similar to predictor.featurize
def cat_hash(s):
    return abs(hash(s)) % 1000 / 1000.0

X = pd.DataFrame({
    'amount': amount,
    'transaction_frequency': transaction_frequency,
    'account_age_days': account_age,
    'previous_fraud_count': previous_fraud_count,
    'device_hash': [cat_hash(x) for x in devices],
    'location_hash': [cat_hash(x) for x in locations],
    'merchant_hash': [cat_hash(x) for x in merchant],
})

y = labels

clf = RandomForestClassifier(n_estimators=200, max_depth=12, random_state=42)
clf.fit(X, y)
joblib.dump(clf, MODEL_PATH)
print('Model saved to', MODEL_PATH)
