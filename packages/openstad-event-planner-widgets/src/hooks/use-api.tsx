import { useState, useEffect, useCallback } from 'react';

import { useConfig } from '../context/config-context';
import { useUser } from '../context/user-context';

export function useApi(endpoint: string) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const config = useConfig();
  const user = useUser();

  const reload = useCallback(() => {
    setLoading(true);
    setError(null);
    fetch(`${config.apiUrl}/api/site/${config.siteId}${endpoint}`, {
      headers: {
        'X-Authorization': `Bearer ${user.jwt}`,
      },
    })
      .then(res => {
        if (res.status >= 400) {
          return res.json().then(data => {
            throw new Error(`(${res.status}): ${JSON.stringify(data)}`);
          });
        }

        return res.json();
      })
      .then(res => setData(res))
      .catch(err => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [config, user, endpoint]);

  useEffect(() => reload(), [endpoint, reload]);

  return { loading, data, error, reload };
}
