import { Box, Grid, Typography } from '@mui/material';
import { usePrediction } from '../context/PredictionContext';
import BasisWeightChart from '../charts/BasisWeightChart';
import SteamPressureChart from '../charts/SteamPressureChart';
import MachineSpeedChart from '../charts/MachineSpeedChart';
import AnalyticsCards from '../components/AnalyticsCards';
import Loader from '../components/Loader';
import { useHistory } from '../hooks/useHistory';

const toTrendData = (history) => history.filter((entry) => entry.timestamp).map((entry) => ({
  timestamp: entry.timestamp,
  basisWeight: Number(entry.predicted_basis_weight ?? entry.actual_basis_weight),
  steamPressure: Number(entry.steam_pressure),
  machineSpeed: Number(entry.machine_speed),
}));

export default function AnalyticsPage() {
  const { lastInput } = usePrediction();
  const { data, loading } = useHistory();
  const trend = toTrendData(data);

  return <Box><Typography variant="h4">Analytics</Typography><Typography color="text.secondary" mb={3}>Performance and stability analysis for the active production shift.</Typography><AnalyticsCards/>{loading ? <Loader /> : <Grid container spacing={2.25} mt={.1}><Grid size={{ xs: 12, lg: 4 }}><BasisWeightChart data={trend} target={lastInput.target_basis_weight}/></Grid><Grid size={{ xs: 12, lg: 4 }}><SteamPressureChart data={trend}/></Grid><Grid size={{ xs: 12, lg: 4 }}><MachineSpeedChart data={trend}/></Grid></Grid>}</Box>;
}
