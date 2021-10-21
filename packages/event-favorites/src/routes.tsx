import React from 'react';
import { Switch, Route, Redirect } from 'wouter';

import { HashRouter } from './components/hash-router';
import { FavoritesPage } from './pages/favorites';

export function Router(): JSX.Element {
  return (
    <HashRouter>
      <Switch>
        <Route path="/favorites" component={FavoritesPage} />
        <Redirect to={`/favorites`} />
      </Switch>
    </HashRouter>
  );
}
