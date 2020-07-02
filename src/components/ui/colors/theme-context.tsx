import React, { Dispatch, FunctionComponent, useState } from 'react';
import { Theme } from './color-types';
import ThemeFactory from './theme-factory';

type ThemeContextValue = {
  theme: Theme;
  setTheme: Dispatch<Theme>;
};

export const ThemeContext = React.createContext<ThemeContextValue>({
  theme: ThemeFactory.getTheme(),
  setTheme: () => {},
});

export const ThemeProvider: FunctionComponent<ThemeContextValue> = ({ children }) => {
  const [_theme, _setTheme] = useState<Theme>(ThemeFactory.getTheme());
  return <ThemeContext.Provider value={{ theme: _theme, setTheme: _setTheme }}>{children}</ThemeContext.Provider>;
};
