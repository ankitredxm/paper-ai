import { createContext, useContext, useState } from 'react';
const initialInput = { recipe_id: 103, stock_flow: 95, filler_flow: 15, steam_pressure: 118, machine_speed: 980, moisture: 5.8, ash: 10, caliper: 0.11, target_basis_weight: 80, actual_basis_weight: 80.2 };
const initialResult = { predicted_basis_weight: 81.2, risk: 'WARNING', recommendations: ['Increase Steam Pressure by 2%', 'Reduce Machine Speed by 2%'] };
const PredictionContext = createContext(null);
export function PredictionProvider({ children }) { const [result, setResult] = useState(initialResult); const [lastInput, setLastInput] = useState(initialInput); return <PredictionContext.Provider value={{ result, setResult, lastInput, setLastInput, initialInput }}>{children}</PredictionContext.Provider>; }
export const usePrediction = () => useContext(PredictionContext);
