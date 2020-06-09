import { Theme } from './color-types';
import createTheme, { DEFAULT_THEME } from './default-theme';

type BaseColors = {
  foreground: string;
  background: string;
};
const ThemeFactory = (() => {
  let theme: Theme;

  const instantiate = (currentTheme?: Theme) => {
    if (!currentTheme) return DEFAULT_THEME;
    return currentTheme;
  };

  return {
    getTheme: (colors?: BaseColors) => {
      if (!theme) theme = instantiate((colors && createTheme(colors.foreground, colors.background)) || undefined);
      return theme;
    },
  };
})();

export default ThemeFactory;
