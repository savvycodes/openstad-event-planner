import { DefaultTheme } from 'goober';
import React, { createContext, useContext } from 'react';

/**
 * Default theme values, these should be overrideable via the AppConfig.theme prop
 */
const defaultTheme: DefaultTheme = {
  colors: {
    primary: '#009af0',
    danger: '#CF1919',
    white: '#fff',
    black: '#0D0D0D',
    background: '#f3f3f3',
    lightGray: '#ccc',
    darkGray: '#c0bcbc',
    darkestGray: '#7a7a7a',
  },
  sizes: {
    sm: 6,
    md: 8,
    lg: 12,
  },
  font: {
    size: 16,
    family:
      "'Avenir Next W01', 'Avenir', 'Noto Sans', 'Roboto', Helvetica, Arial, sans-serif",
  },
  effects: {
    // @todo: this color is not dynamic, boxShadowPrimary should be a function composing shadow size (don't think that should be configurable) and color together
    boxShadowPrimary: '0 6px 9px 0px #ccc',
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
