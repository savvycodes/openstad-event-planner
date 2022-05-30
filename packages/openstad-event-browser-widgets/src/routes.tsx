import React from 'react';
import { Switch, Route, Redirect, Router as Wouter } from 'wouter';

// import { HashRouter } from './components/hash-router';
import { EventDetailPage } from './pages/event-detail';
import { EventsPage } from './pages/events';

export function Router({ base }: any): JSX.Element {
  return (
    <Wouter base={base}>
      <Switch>
        <Route path="/" component={EventsPage} />
        <Route path={`/:id`} component={EventDetailPage} />
        <Redirect to={`/`} />
      </Switch>
    </Wouter>
  );
}
