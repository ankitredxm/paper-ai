export const formatGsm = (value) => Number(value || 0).toFixed(2);
export const titleCase = (value = '') => value.charAt(0) + value.slice(1).toLowerCase();
export const riskColor = (risk) => ({ SAFE: 'success', WARNING: 'warning', CRITICAL: 'error' }[risk] || 'success');
