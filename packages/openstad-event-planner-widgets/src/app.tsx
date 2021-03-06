import React, { createElement } from 'react';
import { DefaultTheme, setup } from 'goober';

import { defaultTheme, ThemeProvider, useTheme } from './theme/theme';
import { UserProvider } from './context/user-context';
import { Router } from './routes';
import { ConfigProvider } from './context/config-context';

setup(createElement, undefined, useTheme);

export type AppConfig = {
  siteId: number;
  jwt: string;
  apiUrl: string;
  imageUrl: string;
  user?: {
    isEventProvider?: boolean;
    // @todo: define all possible roles in a seperate type
    role?: string;
  };
  themes?: any;
  areas?: any;
};

type AppProps = {
  theme?: DefaultTheme;
  config: AppConfig;
};

export function App(props: AppProps): JSX.Element {
  const theme = { ...defaultTheme, ...props.theme };

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider value={props.config}>
        <UserProvider
          value={{
            jwt: props.config.jwt,
            role: props.config.user?.role,
            isEventProvider: props.config.user?.isEventProvider || false,
          }}
        >
          <Router />
        </UserProvider>
      </ConfigProvider>
    </ThemeProvider>
  );
}
