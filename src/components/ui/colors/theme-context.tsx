import React, { FunctionComponent } from 'react';
import { Theme } from './color-types';
import ThemeFactory from './theme-factory';

type ThemeContextValue = {
  theme: Theme;
};

export const ThemeContext = React.createContext<ThemeContextValue>({ theme: ThemeFactory.getTheme() });

export const ThemeProvider: FunctionComponent<{ theme: Theme }> = ({ theme, children }) => {
  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};
