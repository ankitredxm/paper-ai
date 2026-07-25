import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { theme } from './styles/theme';
import { PredictionProvider } from './context/PredictionContext';
import './styles/global.css';

createRoot(document.getElementById('root')).render(<StrictMode><ThemeProvider theme={theme}><CssBaseline /><BrowserRouter><PredictionProvider><App /></PredictionProvider></BrowserRouter></ThemeProvider></StrictMode>);
