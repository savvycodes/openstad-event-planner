import React, { createContext, useContext } from 'react';

interface Theme {
  primary?: string;
}

const defaultTheme: Theme = { primary: 'blue' };
const ThemeContext = createContext(defaultTheme);
const useTheme = () => useContext(ThemeContext);

function ThemeProvider(props: {
  children: React.ReactNode;
  theme: Theme;
}): JSX.Element {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { useTheme, Theme, ThemeProvider, defaultTheme };
