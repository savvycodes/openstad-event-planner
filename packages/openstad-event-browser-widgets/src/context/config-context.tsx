import React, { createContext, useContext } from 'react';

import { AppConfig } from '../app';

const defaultConfig = {
  siteId: 2,
  jwt: '',
  apiUrl: '',
  imageUrl: '',
  user: {
    role: '',
    isEventProvider: false,
  },
  map: {
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    accessToken: '',
    id: '',
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
