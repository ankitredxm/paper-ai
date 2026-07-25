import random
from datetime import datetime, timedelta

import numpy as np
import pandas as pd

from recipes import RECIPES

def rand(low, high):
    return round(random.uniform(low, high), 2)

def risk_label(actual, target):
    deviation = abs(actual - target) / target * 100

    if deviation < 1:
        return deviation, "SAFE"

    elif deviation < 2.5:
        return deviation, "WARNING"

    return deviation, "CRITICAL"

start_time = datetime(2026, 1, 1, 8, 0, 0)

rows = []

TOTAL_ROWS = 20000

current_time = start_time

recipe = random.choice(RECIPES)

for i in range(TOTAL_ROWS):

    if i % 3500 == 0:
        recipe = random.choice(RECIPES)

    stock = rand(*recipe["stock_flow"])

    steam = rand(*recipe["steam"])

    speed = rand(*recipe["speed"])

    moisture = rand(4.8, 6.2)

    ash = rand(8, 15)

    caliper = rand(0.08, 0.15)

    filler = rand(10, 18)

    target = recipe["target_bw"]

    actual = (
    target
    + 0.18 * (stock - np.mean(recipe["stock_flow"]))
    - 0.02 * (speed - np.mean(recipe["speed"]))
    + np.random.normal(0, 0.4)
    )


    if random.random() < 0.05:

        actual += random.uniform(-4, 4)

    deviation, risk = risk_label(actual, target)

    rows.append({
        "timestamp": current_time,
        "recipe_id": recipe["id"],
        "target_basis_weight": target,
        "actual_basis_weight": round(actual, 2),
        "stock_flow": stock,
        "filler_flow": filler,
        "steam_pressure": steam,
        "machine_speed": speed,
        "moisture": moisture,
        "ash": ash,
        "caliper": caliper,
        "deviation_percent": round(deviation, 2),
        "risk_level": risk
    })

    current_time += timedelta(seconds=5)

df = pd.DataFrame(rows)

df.to_csv("paper_data.csv", index=False)

print(df.head())

print("Dataset Created Successfully")