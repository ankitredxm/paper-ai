def recommend(sensor_df, model):

    prediction = model.predict(sensor_df)[0]

    recommendations = []

    row = sensor_df.iloc[0]

    if row["steam_pressure"] < 118:
        recommendations.append("Increase Steam Pressure by 2%")

    if row["machine_speed"] > 980:
        recommendations.append("Reduce Machine Speed by 2%")

    if row["stock_flow"] < 95:
        recommendations.append("Increase Stock Flow")

    if row["moisture"] > 6:
        recommendations.append("Reduce Moisture")

    if not recommendations:
        recommendations.append("Process parameters are within the recommended operating range.")

    return prediction, recommendations