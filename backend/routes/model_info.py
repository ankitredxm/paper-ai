from fastapi import APIRouter

router = APIRouter()


@router.get("/model-info")
def model_info():

    return {

        "model": "XGBoost Regressor",

        "prediction_horizon": "5 Minutes",

        "version": "2.0",

        "algorithm": "XGBoost",

        "target": "Future Basis Weight",

        "risk_levels": [

            "SAFE",

            "WARNING",

            "CRITICAL"

        ]

    }