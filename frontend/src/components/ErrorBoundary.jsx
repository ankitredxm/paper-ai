import { Component } from 'react';
import { Alert, Box } from '@mui/material';
export default class ErrorBoundary extends Component { state = { error: false }; static getDerivedStateFromError() { return { error: true }; } render() { return this.state.error ? <Box p={3}><Alert severity="error">The workspace encountered an unexpected error. Refresh the page to continue.</Alert></Box> : this.props.children; } }
