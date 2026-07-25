from pydantic import BaseModel

class SensorInput(BaseModel):
    recipe_id: int
    stock_flow: float
    filler_flow: float
    steam_pressure: float
    machine_speed: float
    moisture: float
    ash: float
    caliper: float
    target_basis_weight: float
    actual_basis_weight: float