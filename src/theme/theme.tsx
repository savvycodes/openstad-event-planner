import { createContext, useContext } from 'react';

type iTheme = {
  primary: string;
};

// @todo: fetch this from somewhere
const theme: iTheme = { primary: 'blue' };
const ThemeContext = createContext(theme);
const useTheme = () => useContext(ThemeContext);

export { useTheme, iTheme };
