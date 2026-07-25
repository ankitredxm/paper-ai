from collections import deque
import pandas as pd

# Store last 5 readings
history = deque(maxlen=5)

# Feature order used during training
MODEL_FEATURES = [
    "recipe_id",
    "target_basis_weight",
    "stock_flow",
    "filler_flow",
    "steam_pressure",
    "machine_speed",
    "moisture",
    "ash",
    "caliper",
    "deviation_percent",
    "risk_level",
    "stock_flow_lag1",
    "stock_flow_lag2",
    "stock_flow_lag3",
    "steam_pressure_lag1",
    "steam_pressure_lag2",
    "steam_pressure_lag3",
    "machine_speed_lag1",
    "machine_speed_lag2",
    "machine_speed_lag3",
    "moisture_lag1",
    "moisture_lag2",
    "moisture_lag3",
    "actual_basis_weight_lag1",
    "actual_basis_weight_lag2",
    "actual_basis_weight_lag3",
    "bw_mean_5",
    "steam_mean_5",
    "speed_mean_5"
]


def build_features(sensor):
    """
    sensor should be a dictionary like:

    {
        "recipe_id":103,
        "stock_flow":95,
        "filler_flow":15,
        "steam_pressure":118,
        "machine_speed":980,
        "moisture":5.8,
        "ash":10,
        "caliper":0.11,
        "target_basis_weight":80,
        "actual_basis_weight":80.3
    }
    """

    history.append(sensor.copy())

    row = sensor.copy()

    row["risk_level"] = 0

    row["deviation_percent"] = (
        abs(
            sensor["actual_basis_weight"]
            - sensor["target_basis_weight"]
        )
        / sensor["target_basis_weight"]
    ) * 100

    # -------- Lag Features --------

    for lag in [1, 2, 3]:

        if len(history) > lag:
            prev = history[-(lag + 1)]
        else:
            prev = sensor

        row[f"stock_flow_lag{lag}"] = prev["stock_flow"]
        row[f"steam_pressure_lag{lag}"] = prev["steam_pressure"]
        row[f"machine_speed_lag{lag}"] = prev["machine_speed"]
        row[f"moisture_lag{lag}"] = prev["moisture"]
        row[f"actual_basis_weight_lag{lag}"] = prev["actual_basis_weight"]

    # -------- Rolling Means --------

    row["bw_mean_5"] = sum(
        x["actual_basis_weight"] for x in history
    ) / len(history)

    row["steam_mean_5"] = sum(
        x["steam_pressure"] for x in history
    ) / len(history)

    row["speed_mean_5"] = sum(
        x["machine_speed"] for x in history
    ) / len(history)

    df = pd.DataFrame([row])

    # Model does not use current actual basis weight
    if "actual_basis_weight" in df.columns:
        df.drop(columns=["actual_basis_weight"], inplace=True)

    df = df[MODEL_FEATURES]

    return df