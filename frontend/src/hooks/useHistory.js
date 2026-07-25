import { useCallback, useEffect, useState } from 'react';
import { getApiErrorMessage } from '../api/client';
import { getHistory } from '../services/historyService';

export function useHistory() {
  const [state, setState] = useState({ data: [], loading: true, error: '' });
  const refresh = useCallback(async () => {
    try {
      setState((current) => ({ ...current, loading: true, error: '' }));
      const { data } = await getHistory();
      setState({ data: data.history || [], loading: false, error: '' });
    } catch (requestError) {
      setState((current) => ({ ...current, loading: false, error: getApiErrorMessage(requestError) }));
    }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  return { ...state, refresh };
}
