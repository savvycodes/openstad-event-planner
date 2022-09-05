import React from 'react';
import { Switch, Route, Redirect, Router as Wouter } from 'wouter';

// import { HashRouter } from './components/hash-router';
import { EventDetailPage } from './pages/event-detail';
import { EventsPage } from './pages/events';

export function Router({ base, slug, prefixUrl }: any): JSX.Element {
  return (
    <Wouter>
      <Switch>
        <Route path={`${prefixUrl}${base}`} component={EventsPage} />
        <Route path={`${prefixUrl}${slug}/:id`} component={EventDetailPage} />
        <Redirect to={`${prefixUrl}/${base}`} />
      </Switch>
    </Wouter>
  );
}
