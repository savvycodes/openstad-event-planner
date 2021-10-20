import React from 'react';
import { Switch, Route, Redirect } from 'wouter';

import { HashRouter } from './components/hash-router';
import { EventsPage } from './pages/events';

export function Router(): JSX.Element {
  return (
    <HashRouter>
      <Switch>
        <Route path="/events" component={EventsPage} />
        <Redirect to={`/events`} />
      </Switch>
    </HashRouter>
  );
}
