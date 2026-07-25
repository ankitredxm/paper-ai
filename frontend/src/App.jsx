import { lazy, Suspense } from 'react'; import { Navigate, Route, Routes } from 'react-router-dom'; import AppLayout from './layout/AppLayout'; import ErrorBoundary from './components/ErrorBoundary'; import Loader from './components/Loader';
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PredictionPage = lazy(() => import('./pages/PredictionPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const HistoryPage = lazy(() => import('./pages/HistoryPage'));
const Workspace = ({ children }) => <AppLayout>{children}</AppLayout>;
export default function App() { return <ErrorBoundary><Suspense fallback={<Loader />}><Routes><Route path="/login" element={<LoginPage/>}/><Route path="/dashboard" element={<Workspace><DashboardPage/></Workspace>}/><Route path="/prediction" element={<Workspace><PredictionPage/></Workspace>}/><Route path="/analytics" element={<Workspace><AnalyticsPage/></Workspace>}/><Route path="/history" element={<Workspace><HistoryPage/></Workspace>}/><Route path="*" element={<Navigate to="/login" replace/>}/></Routes></Suspense></ErrorBoundary>; }
