import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: { primary: { main: '#C8102E', dark: '#9F0D25' }, secondary: { main: '#1E293B' }, background: { default: '#F5F7FA', paper: '#FFFFFF' }, text: { primary: '#0F172A', secondary: '#64748B' }, success: { main: '#22C55E' }, warning: { main: '#F59E0B' }, error: { main: '#EF4444' } },
  typography: { fontFamily: 'Inter, "Segoe UI", sans-serif', h4: { fontWeight: 700, letterSpacing: '-0.02em' }, h5: { fontWeight: 700 }, subtitle2: { fontWeight: 700 }, button: { fontWeight: 700, textTransform: 'none' } },
  shape: { borderRadius: 8 },
  components: { MuiPaper: { styleOverrides: { root: { border: '1px solid #E2E8F0', boxShadow: '0 1px 2px rgba(15,23,42,.035)' } } }, MuiButton: { styleOverrides: { root: { borderRadius: 6, padding: '9px 16px' } } }, MuiTextField: { defaultProps: { size: 'small' } } }
});
