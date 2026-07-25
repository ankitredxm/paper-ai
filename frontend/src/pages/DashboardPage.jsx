import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { usePrediction } from '../context/PredictionContext';
import PredictionCard from '../components/PredictionCard';
import RiskCard from '../components/RiskCard';
import RecommendationCard from '../components/RecommendationCard';
import SensorForm from '../components/SensorForm';
import BasisWeightChart from '../charts/BasisWeightChart';
import SteamPressureChart from '../charts/SteamPressureChart';
import MachineSpeedChart from '../charts/MachineSpeedChart';
import AnalyticsCards from '../components/AnalyticsCards';
import HistoryTable from '../components/HistoryTable';
import { useHistory } from '../hooks/useHistory';
import Loader from '../components/Loader';

const toTrendData = (history) => history.filter((entry) => entry.timestamp).map((entry) => ({
  timestamp: entry.timestamp,
  basisWeight: Number(entry.predicted_basis_weight ?? entry.actual_basis_weight),
  steamPressure: Number(entry.steam_pressure),
  machineSpeed: Number(entry.machine_speed),
}));

export default function DashboardPage() {
  const { result, lastInput } = usePrediction();
  const { data, loading } = useHistory();
  const trend = toTrendData(data);

  return <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .25 }}><Box mb={3}><Typography variant="h4">Operations overview</Typography><Typography color="text.secondary">AI-assisted basis weight control for Paper Machine 2.</Typography></Box><Grid container spacing={2.25}><Grid size={{ xs: 12, md: 4 }}><PredictionCard value={result.predicted_basis_weight} /></Grid><Grid size={{ xs: 12, md: 3 }}><RiskCard risk={result.risk} predicted={result.predicted_basis_weight} target={lastInput.target_basis_weight} /></Grid><Grid size={{ xs: 12, md: 5 }}><RecommendationCard recommendations={result.recommendations} /></Grid><Grid size={12}><SensorForm /></Grid><Grid size={{ xs: 12, lg: 4 }}><BasisWeightChart data={trend} target={lastInput.target_basis_weight} /></Grid><Grid size={{ xs: 12, lg: 4 }}><SteamPressureChart data={trend} /></Grid><Grid size={{ xs: 12, lg: 4 }}><MachineSpeedChart data={trend} /></Grid><Grid size={12}><Typography variant="h6" mb={1.5}>Operational analytics</Typography><AnalyticsCards /></Grid><Grid size={12}>{loading ? <Loader /> : <HistoryTable rows={data} />}</Grid></Grid></motion.div>;
}
