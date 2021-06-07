import { DefaultTheme } from 'goober';
import React, { createContext, useContext } from 'react';

const defaultTheme: DefaultTheme = {
  primary: 'blue',
  danger: 'tomato',
  sizes: {
    sm: 6,
    md: 8,
    lg: 12,
  },
  font: {
    size: 16,
    family: "'Noto Sans', sans-serif",
  },
};

const ThemeContext = createContext(defaultTheme);
const useTheme = () => useContext(ThemeContext);

function ThemeProvider(props: {
  children: React.ReactNode;
  theme: DefaultTheme;
}): JSX.Element {
  return (
    <ThemeContext.Provider value={props.theme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export { useTheme, DefaultTheme as Theme, ThemeProvider, defaultTheme };
