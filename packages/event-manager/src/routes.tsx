import React, { useEffect } from 'react';
import { Route, Switch } from 'wouter';

import { HashRouter, useHashLocation } from './components/hash-router';
import { Spinner } from './components/spinner';
import { useUser } from './context/user-context';
import { useApi } from './hooks/use-api';
import { EventOverviewPage } from './pages/events/event-overview';
import { ProviderMainContactPage } from './pages/provider/main-contact';
import { ProviderOrganisationPage } from './pages/provider/organisation';

/**
 * @todo: fix the routing to check where to navigate to
 */
export function Router(): JSX.Element {
  const user = useUser();
  const [, navigate] = useHashLocation();
  const { data: organisation, loading, error } = useApi('/organisation/me');

  useEffect(() => {
    if (loading && !organisation) {
      return;
    }

    if (!organisation || !Object.keys(organisation).length) {
      navigate('/provider/organisation');
    } else if (organisation && organisation.status === 'verified') {
      // navigate to events overview
      navigate('/events');
    } else {
      console.log('waiting on verification');
    }
  }, [organisation, loading, navigate]);

  if (!user.jwt) {
    return <p>Niet ingelogd: (Show login button)</p>;
  }

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Oops, something went wrong {JSON.stringify(error)}</p>;
  }

  return (
    <HashRouter>
      <Switch>
        <Route
          path="/provider/organisation"
          component={ProviderOrganisationPage}
        />
        <Route path="/provider/contact" component={ProviderMainContactPage} />
        <Route path="/events" component={EventOverviewPage} />
        <Route component={() => <p>Geen pagina gevonden</p>} />
      </Switch>
    </HashRouter>
  );
}
