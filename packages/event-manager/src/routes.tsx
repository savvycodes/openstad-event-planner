import React, { useEffect } from 'react';
import { Route, Switch } from 'wouter';
import isEmpty from 'lodash.isempty';

import { HashRouter, useHashLocation } from './components/hash-router';
import { Spinner } from './components/spinner';
import { ErrorBanner } from './components/error-banner';

import { EventOverviewPage } from './pages/events/event-overview';
import { SignupPage } from './pages/signup';
import { ProviderAddActivityPage } from './pages/provider/add-activity';
import { ProviderActivityOverviewPage } from './pages/provider/activity-overview';
import { UserListPage } from './pages/admin/users';
import { CreateUserPage } from './pages/admin/user-create';

import { useApi } from './hooks/use-api';
import { useUser } from './context/user-context';
/**
 * @todo: fix the routing to check where to navigate to
 */
export function Router(): JSX.Element {
  const [, navigate] = useHashLocation();
  const { data: organisation, loading, error } = useApi('/organisation/me');
  const { role } = useUser();
  const isAdmin = role === 'admin';

  useEffect(() => {
    if (loading && !organisation) {
      return;
    }

    if (isAdmin) {
      navigate('/admin/users');
    } else if (isEmpty(organisation)) {
      navigate('/signup');
    } else {
      // navigate to events overview
      navigate('/events');
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
        {isAdmin ? (
          <>
            <Route path="/admin/users" component={UserListPage} />
            <Route path="/admin/users/create" component={CreateUserPage} />
          </>
        ) : (
          <>
            <Route path="/signup" component={SignupPage} />
            <Route path="/events" component={EventOverviewPage} />
            <Route
              path="/aanbieder/activiteit-toevoegen"
              component={ProviderAddActivityPage}
            />
            <Route
              path="/aanbieder/activiteiten"
              component={ProviderActivityOverviewPage}
            />
          </>
        )}
        <Route component={() => <p>Geen pagina gevonden</p>} />
      </Switch>
    </HashRouter>
  );
}
