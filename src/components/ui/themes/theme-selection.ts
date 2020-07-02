import DEFAULT_THEME from '@ui/themes/default-theme';
import lightTheme from '@ui/themes/light-theme';
import darkTheme from '@ui/themes/dark-theme';
import { BaseTheme } from '@ui/colors/color-types';

type ThemeSelector = {
  [name: string]: BaseTheme;
};

const themes: ThemeSelector = {
  [DEFAULT_THEME.name]: DEFAULT_THEME,
  [lightTheme.name]: lightTheme,
  [darkTheme.name]: darkTheme,
};

export default themes;
