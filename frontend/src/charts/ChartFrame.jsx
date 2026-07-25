import { Paper, Typography } from '@mui/material';
export default function ChartFrame({ title, subtitle, children }) { return <Paper sx={{ p: 2.5, height: 342 }}><Typography variant="h6">{title}</Typography><Typography variant="caption" color="text.secondary">{subtitle}</Typography>{children}</Paper>; }
