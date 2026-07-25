import { Box, CircularProgress } from '@mui/material';
export default function Loader() { return <Box sx={{ minHeight: 180, display: 'grid', placeItems: 'center' }}><CircularProgress size={28} /></Box>; }
