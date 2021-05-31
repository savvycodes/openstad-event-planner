import React, { createElement } from 'react';
import { Route } from 'wouter';
import { setup } from 'goober';

import { useTheme } from './theme/theme';
import { HashRouter } from './components/hash-router';
import { ProviderMainContactPage } from './pages/provider/main-contact';
import { ProviderOrganisationPage } from './pages/provider/organisation';

// @todo: Theme needs to be fetched from external config/location
setup(createElement, undefined, useTheme);

export function App(): JSX.Element {
  return (
    <HashRouter>
      <Route
        path="/aanbieder/organisation"
        component={ProviderOrganisationPage}
      />
      <Route path="/aanbieder/contact" component={ProviderMainContactPage} />
    </HashRouter>
  );
}
