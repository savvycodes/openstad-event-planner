import React, { createContext, useContext } from 'react';

import { AppConfig } from '../app';

const ConfigContext = createContext<AppConfig>({
  siteId: 2,
  jwt: '',
  apiUrl: '',
  imageUrl: '',
  user: {
    role: '',
    isEventProvider: false,
  },
});

type ConfigProviderProps = {
  children: React.ReactNode;
  value: AppConfig;
};

export const ConfigProvider = (props: ConfigProviderProps): JSX.Element => {
  return (
    <ConfigContext.Provider value={props.value}>
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
