import os
import pandas as pd

# Folder to store logs
DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

CSV_FILE = os.path.join(DATA_DIR, "sensor_history.csv")


def log_sensor_data(sensor: dict):
    """
    Append every incoming sensor reading to sensor_history.csv
    """

    df = pd.DataFrame([sensor])

    if os.path.exists(CSV_FILE):
        df.to_csv(CSV_FILE, mode="a", header=False, index=False)
    else:
        df.to_csv(CSV_FILE, mode="w", header=True, index=False)