import React, { FunctionComponent, ReactNode } from 'react';
import { Theme } from './color-types';

type ThemeContextValue = {
  theme?: Theme;
};

export const PrivateThemeContext = React.createContext<ThemeContextValue>({});

export const ThemeProvider: FunctionComponent<{ theme: Theme }> = ({ theme, children }) => {
  return <PrivateThemeContext.Provider value={{ theme }}>{children}</PrivateThemeContext.Provider>;
};

type ThemeConsumerInjectedProps = {
  theme: Theme;
};

type ThemeConsumerProps = {
  children: (props: ThemeConsumerInjectedProps) => ReactNode;
};

export const ThemeConsumer: FunctionComponent<ThemeConsumerProps> = ({ children }) => {
  return (
    <PrivateThemeContext.Consumer>
      {({ theme }) => {
        if (!theme)
          throw new Error(
            'No theme defined in React Context. Make sure a ThemeProvider is being rendered upper in the component tree.'
          );
        return children({ theme });
      }}
    </PrivateThemeContext.Consumer>
  );
};
