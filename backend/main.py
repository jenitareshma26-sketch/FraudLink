from fastapi import FastAPI
from routes.predict import router as predict_router

app = FastAPI(title="FraudLink API")

app.include_router(predict_router)

@app.get("/health")
def health():
    return {"status": "ok"}
