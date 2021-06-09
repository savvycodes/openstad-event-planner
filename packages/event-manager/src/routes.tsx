import React, { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import isEmpty from 'lodash.isempty';

import { HashRouter, useHashLocation } from './components/hash-router';
import { Spinner } from './components/spinner';
import { ErrorBanner } from './components/error-banner';

import { EventOverviewPage } from './pages/events/event-overview';
import { SignupPage } from './pages/signup';
import { WaitingOnVerificationPage } from './pages/waiting-on-verification';
import { ProviderAddActivityPage } from './pages/provider/add-activity';
import { ProviderActivityOverviewPage } from './pages/provider/activity-overview';

import { useApi } from './hooks/use-api';
/**
 * @todo: fix the routing to check where to navigate to
 */
export function Router(): JSX.Element {
  const [, navigate] = useHashLocation();
  const { data: organisation, loading, error } = useApi('/organisation/me');

  useEffect(() => {
    if (loading && !organisation) {
      return;
    }

    if (isEmpty(organisation)) {
      navigate('/signup');
    } else if (organisation.status === 'VERIFIED') {
      // navigate to events overview
      navigate('/events');
    } else {
      console.log('waiting on verification');
      navigate('/pending-verification');
    }
  }, [organisation, loading, navigate]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorBanner>
        Oops, something went wrong {JSON.stringify(error)}
      </ErrorBanner>
    );
  }

  return (
    <HashRouter>
      <Switch>
        <Route path="/signup" component={SignupPage} />
        <Route path="/events" component={EventOverviewPage} />
        <Route
          path="/pending-verification"
          component={WaitingOnVerificationPage}
        />
        <Route
          path="/aanbieder/activiteit-toevoegen"
          component={ProviderAddActivityPage}
        />
        <Route
          path="/aanbieder/activiteiten"
          component={ProviderActivityOverviewPage}
        />
        <Route component={() => <p>Geen pagina gevonden</p>} />
      </Switch>
    </HashRouter>
  );
}
