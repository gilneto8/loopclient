import tinycolor from 'tinycolor2';
import { BaseColors, ColorTheme, TextTheme, Theme } from './color-types';
import { DEFAULT_THEME } from './default-theme';

const getTextTheme = (fg: string, bg: string): TextTheme => {
  return {
    contrast_bg: tinycolor(fg).lighten(10).toRgbString(),
    blend_bg: tinycolor(bg).lighten(25).toRgbString(),
    contrast_fg: tinycolor(bg).lighten(10).toRgbString(),
    blend_fg: tinycolor(fg).darken(15).toRgbString(),
  };
};

const getColorTheme = (color: string): ColorTheme => ({
  color: tinycolor(color).toRgbString(),
  tones: {
    l_10: tinycolor(color).brighten(10).toRgbString(),
    l_30: tinycolor(color).brighten(30).toRgbString(),
    l_50: tinycolor(color).brighten(50).toRgbString(),
    d_10: tinycolor(color).darken(10).toRgbString(),
    d_30: tinycolor(color).darken(30).toRgbString(),
    d_50: tinycolor(color).darken(50).toRgbString(),
  },
  functional: {
    hovering: tinycolor(color).brighten(10).toRgbString(),
    selected: tinycolor(color).brighten(30).toRgbString(),
    disabled: tinycolor(color).desaturate(30).toRgbString(),
  },
  complements: tinycolor(color)
    .splitcomplement()
    .map((color: tinycolor.Instance) => color.toRgbString()),
});

const createTheme = (fg: string, bg: string): Theme => ({
  foreground: getColorTheme(fg),
  background: getColorTheme(bg),
  text: getTextTheme(fg, bg),
});

const ThemeFactory = (() => {
  let theme: Theme;

  return {
    getTheme: (colors?: BaseColors) => {
      if (!theme)
        theme = colors
          ? createTheme(colors.foreground, colors.background)
          : createTheme(DEFAULT_THEME.foreground, DEFAULT_THEME.background);

      return theme;
    },
  };
})();

export default ThemeFactory;
