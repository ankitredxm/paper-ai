import json
import os

import pandas as pd

DATA_DIR = "data"
os.makedirs(DATA_DIR, exist_ok=True)

CSV_FILE = os.path.join(DATA_DIR, "sensor_history.csv")
SENSOR_COLUMNS = [
    "recipe_id", "stock_flow", "filler_flow", "steam_pressure", "machine_speed",
    "moisture", "ash", "caliper", "target_basis_weight", "actual_basis_weight",
]
HISTORY_COLUMNS = [
    "timestamp", *SENSOR_COLUMNS, "predicted_basis_weight", "recommendations", "risk",
]


def log_prediction_record(record: dict):
    """Append a complete, timestamped prediction record to the history CSV."""
    row = {column: record.get(column, "") for column in HISTORY_COLUMNS}
    row["recommendations"] = json.dumps(record.get("recommendations", []))
    entry = pd.DataFrame([row], columns=HISTORY_COLUMNS)

    if not os.path.exists(CSV_FILE):
        entry.to_csv(CSV_FILE, index=False)
        return

    existing = pd.read_csv(CSV_FILE)
    missing_columns = [column for column in HISTORY_COLUMNS if column not in existing.columns]
    if missing_columns or list(existing.columns) != HISTORY_COLUMNS:
        for column in missing_columns:
            existing[column] = ""
        existing = existing.reindex(columns=HISTORY_COLUMNS)
        existing.to_csv(CSV_FILE, index=False)

    entry.to_csv(CSV_FILE, mode="a", header=False, index=False)
