import os
import pandas as pd

from fastapi import APIRouter

router = APIRouter()

CSV_FILE = "data/sensor_history.csv"


@router.get("/history")
def get_history():

    if not os.path.exists(CSV_FILE):
        return {
            "history": []
        }

    df = pd.read_csv(CSV_FILE)

    # Return latest 50 rows
    df = df.tail(50)

    return {
        "count": len(df),
        "history": df.to_dict(orient="records")
    }