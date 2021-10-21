import React, { createContext, useContext, useEffect, useState } from 'react';
import { useConfig } from './config-context';

type UserContextType = {
  jwt?: string;
  role?: string;
  isEventProvider: boolean;
  user?: any;
};

const UserContext = createContext<UserContextType>({
  jwt: '',
  role: '',
  isEventProvider: false,
  user: null,
});

type UserProviderProps = {
  children: React.ReactNode;
  value: UserContextType;
};

export const UserProvider = (props: UserProviderProps): JSX.Element | null => {
  const config = useConfig();

  const [user, setUser] = useState(props.value.user);

  /**
   * Fetch currently loggedin user
   */
  useEffect(() => {
    if (config.jwt) {
      fetch(`${config.apiUrl}/oauth/site/${config.siteId}/me`, {
        headers: {
          'X-Authorization': `Bearer ${config.jwt}`,
        },
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error('Could not fetch user', err));
    }
  }, [config]);

  return (
    <UserContext.Provider value={{ ...props.value, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  function isLoggedIn() {
    if (context && context.jwt) {
      return true;
    }
    return false;
  }

  return { ...context, isLoggedIn };
}
