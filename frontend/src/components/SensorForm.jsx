import { useState } from 'react';
import { Alert, Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { RestartAltOutlined, PlayArrowOutlined } from '@mui/icons-material';
import { getApiErrorMessage } from '../api/client';
import { createPrediction } from '../services/predictionService';
import { usePrediction } from '../context/PredictionContext';

const fieldMeta = [['recipe_id', 'Recipe ID'], ['stock_flow', 'Stock Flow', 't/h'], ['filler_flow', 'Filler Flow', 't/h'], ['steam_pressure', 'Steam Pressure', 'kPa'], ['machine_speed', 'Machine Speed', 'm/min'], ['moisture', 'Moisture', '%'], ['ash', 'Ash', '%'], ['caliper', 'Caliper', 'mm'], ['target_basis_weight', 'Target Basis Weight', 'GSM'], ['actual_basis_weight', 'Actual Basis Weight', 'GSM']];

export default function SensorForm() {
  const { initialInput, setResult, setLastInput } = usePrediction();
  const [values, setValues] = useState(initialInput);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const change = (key, value) => setValues((current) => ({ ...current, [key]: value }));
  const predict = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    const payload = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
    try {
      const { data } = await createPrediction(payload);
      setResult(data);
      setLastInput(payload);
    } catch (requestError) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };
  return <Paper component="form" onSubmit={predict} sx={{ p: 2.5 }}><Box display="flex" justifyContent="space-between" alignItems="center" mb={2}><Box><Typography variant="h6">Sensor inputs</Typography><Typography variant="body2" color="text.secondary">Live process conditions from PM-2</Typography></Box></Box>{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}<Grid container spacing={1.5}>{fieldMeta.map(([key, label, unit]) => <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={key}><TextField required fullWidth type="number" label={label} value={values[key]} onChange={(event) => change(key, event.target.value)} slotProps={{ htmlInput: { step: key === 'recipe_id' ? 1 : 'any' }, input: { endAdornment: unit ? <Typography variant="caption" color="text.secondary">{unit}</Typography> : null } }} /></Grid>)}</Grid><Box display="flex" gap={1.5} mt={2.5}><Button type="submit" variant="contained" startIcon={<PlayArrowOutlined />} disabled={loading}>{loading ? 'Running model…' : 'Predict basis weight'}</Button><Button variant="outlined" color="secondary" startIcon={<RestartAltOutlined />} onClick={() => setValues(initialInput)}>Reset</Button></Box></Paper>;
}
