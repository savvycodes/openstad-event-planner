import { useState, useEffect } from 'react';

import { useConfig } from '../context/config-context';
import { useUser } from '../context/user-context';

export function useApi(endpoint: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const config = useConfig();
  const user = useUser();

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`${config.apiUrl}/api/site/${config.siteId}${endpoint}`, {
      headers: {
        'X-Authorization': `Bearer ${user.jwt}`,
      },
    })
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => {
        setData(null);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return { loading, data, error };
}
