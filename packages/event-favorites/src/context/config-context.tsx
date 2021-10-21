import React, { createContext, useContext } from 'react';

import { AppConfig } from '../app';

const defaultConfig: AppConfig = {
  siteId: 2,
  jwt: '',
  apiUrl: '',
  imageUrl: '',
  activityPageUrl: 'http://localhost:1234/#',
  user: {
    role: '',
    isEventProvider: false,
  },
};

const ConfigContext = createContext<AppConfig>(defaultConfig);

type ConfigProviderProps = {
  children: React.ReactNode;
  value: AppConfig;
};

export const ConfigProvider = (props: ConfigProviderProps): JSX.Element => {
  return (
    <ConfigContext.Provider value={{ ...defaultConfig, ...props.value }}>
      {props.children}
    </ConfigContext.Provider>
  );
};

export function useConfig() {
  const context = useContext(ConfigContext);

  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }

  return context;
}
