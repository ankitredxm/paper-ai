def calculate_risk(predicted_bw, target_bw):

    deviation = abs(predicted_bw - target_bw)

    deviation_percent = (deviation / target_bw) * 100

    if deviation_percent < 1:
        return "SAFE"

    elif deviation_percent < 2.5:
        return "WARNING"

    return "CRITICAL"