import { Box, Paper, Typography } from '@mui/material';

export default function ChartFrame({ title, subtitle, data, children }) {
  return <Paper sx={{ p: 2.5, height: 342 }}><Typography variant="h6">{title}</Typography><Typography variant="caption" color="text.secondary">{subtitle}</Typography>{data.length ? children : <Box sx={{ height: '82%', display: 'grid', placeItems: 'center' }}><Typography variant="body2" color="text.secondary">No production data available.</Typography></Box>}</Paper>;
}
