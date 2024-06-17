import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'wouter';
import isEmpty from 'lodash.isempty';

import { HashRouter, useHashLocation } from './components/hash-router';
import { Spinner } from './components/spinner';
import { ErrorBanner } from './components/error-banner';

import { SignupPage } from './pages/signup';
import { ProviderAddActivityPage } from './pages/events/add-activity';
import { ProviderActivityOverviewPage } from './pages/events/activity-overview';
import { UserListPage } from './pages/admin/users';
import { CreateUserPage } from './pages/admin/user-create';

import { useApi } from './hooks/use-api';
import { useUser } from './context/user-context';
import { EditActivityPage } from './pages/events/edit-activity';
import { OrganisationSettingsPage } from './pages/organisation/settings';
import { AdminEditActivityPage } from './pages/admin/edit-activity';

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
      // navigate('/admin/users');
    } else if (isEmpty(organisation) || !organisation.id) {
      navigate('/signup');
    }
  }, [organisation, loading, navigate, isAdmin]);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorBanner>
        Oops, something went wrong {JSON.stringify(error, undefined, 2)}
      </ErrorBanner>
    );
  }

  return (
    <HashRouter >
      {isAdmin ? (
        <Switch>
          <Route path="/events/create" component={ProviderAddActivityPage} />
          <Route path="/events/:id/edit" component={AdminEditActivityPage} />
          <Route path="/events/:rest*" component={ProviderActivityOverviewPage} />
          
          <Route
            path="/admin/events/:id/edit"
            component={AdminEditActivityPage}
          />
          <Route path="/admin/users" component={UserListPage} />
          <Route path="/admin/users/create" component={CreateUserPage} />
          <Redirect to="/events" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/signup" component={SignupPage} />
          <Route path="/events" component={ProviderActivityOverviewPage} />
          <Route
            path="/events/settings"
            component={ProviderActivityOverviewPage}
          />
          <Route
            path="/events/contact"
            component={ProviderActivityOverviewPage}
          />
          <Route path="/events/create" component={ProviderAddActivityPage} />
          <Route path="/events/:id/edit" component={EditActivityPage} />
          <Route
            path="/organisation/settings"
            component={OrganisationSettingsPage}
          />
          <Redirect to="/events" />
        </Switch>
      )}
    </HashRouter>
  );
}
