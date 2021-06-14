import React from 'react';
import useSWR from 'swr';

import { HashRouter } from './components/hash-router';

export function Router(): JSX.Element {
  const { data, error } = useSWR('/event');

  return (
    <HashRouter>
      <p>Evenementen overzicht</p>
      <pre>
        {JSON.stringify(
          {
            data,
            error,
          },
          null,
          2
        )}
      </pre>
    </HashRouter>
  );
}
