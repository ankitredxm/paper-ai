from datetime import datetime

from fastapi import APIRouter

from schemas import SensorInput
from model import model
from recommendation import recommend
from utils import calculate_risk
from feature_builder import build_features
from data_logger import log_prediction_record
router = APIRouter()

@router.post("/predict")
def predict(data: SensorInput):

    sensor = data.model_dump()

    # Create lag features
    df = build_features(sensor)

    prediction, recommendations = recommend(df, model)

    risk = calculate_risk(
        prediction,
        data.target_basis_weight
    )

    if not recommendations:
        recommendations.append(
            "Process parameters are within the recommended operating range."
        )

    response = {
        "predicted_basis_weight": round(float(prediction), 2),
        "risk": risk,
        "recommendations": recommendations
    }

    log_prediction_record({
        **sensor,
        "timestamp": datetime.now(ZoneInfo("Asia/Kolkata")).strftime("%Y-%m-%d %H:%M:%S"),
        **response,
    })

    return response
