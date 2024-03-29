import React, { createElement } from 'react';
import { DefaultTheme, setup } from 'goober';
import { SWRConfig } from 'swr';

import { defaultTheme, ThemeProvider, useTheme } from './theme/theme';
import { UserProvider } from './context/user-context';
import { Router } from './routes';
import { ConfigProvider } from './context/config-context';
import { createFetcher } from './util/fetcher';

setup(createElement, undefined, useTheme);

export type AppConfig = {
  siteId: number;
  jwt?: string;
  apiUrl: string;
  imageUrl: string;
  user?: {
    isEventProvider?: boolean;
    // @todo: define all possible roles in a seperate type
    role?: string;
  };
  map: {
    tileUrl?: string;
    accessToken?: string;
    id?: string;
  };
  base?: string;
  slug?: string;
  reqUrl?: string;
  prefixUrl?: string;
  themes?: any;
  areas?: any;
  providerPageUrl?: string;
};

type AppProps = {
  theme?: DefaultTheme;
  config: AppConfig;
};

export function App(props: AppProps): JSX.Element {
  const theme = { ...defaultTheme, ...props.theme };

  return (
    <ThemeProvider theme={theme}>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            createFetcher(props.config, resource, init),
        }}
      >
        <ConfigProvider value={props.config}>
          <UserProvider
            value={{
              jwt: props.config.jwt,
              role: props.config.user?.role,
              isEventProvider: props.config.user?.isEventProvider || false,
            }}
          >
            <Router base={props.config.base} slug={props.config.slug} reqUrl={props.config.reqUrl} prefixUrl={props.config.prefixUrl}/>
          </UserProvider>
        </ConfigProvider>
      </SWRConfig>
    </ThemeProvider>
  );
}
