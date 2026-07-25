from xgboost import XGBRegressor

model = XGBRegressor()
model.load_model("models/xgboost_model_v2.json")