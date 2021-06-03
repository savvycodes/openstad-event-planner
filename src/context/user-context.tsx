import React, { createContext, useContext } from 'react';

type UserContextType = {
  jwt?: string;
  role?: string;
  isEventProvider: boolean;
};

const UserContext = createContext<UserContextType>({
  jwt: '',
  role: '',
  isEventProvider: false,
});

type UserProviderProps = {
  children: React.ReactNode;
  value: UserContextType;
};

export const UserProvider = (props: UserProviderProps): JSX.Element => {
  // @todo: set state etc.
  // const [user] = useState<UserContextType>({
  //   jwt: '',
  //   role: '',
  //   isEventProvider: false,
  // });

  return (
    <UserContext.Provider value={props.value}>
      {props.children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}
