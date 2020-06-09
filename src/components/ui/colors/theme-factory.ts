import tinycolor from 'tinycolor2';
import { BaseTheme, ColorTheme, DefaultColors, TextTheme, Theme } from './color-types';
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

const createTheme = ({ foreground, background, defaults }: BaseTheme): Theme => ({
  foreground: getColorTheme(foreground),
  background: getColorTheme(background),
  text: getTextTheme(foreground, background),
  defaults: defaults || DefaultColors,
});

const ThemeFactory = (() => {
  let theme: Theme;

  return {
    getTheme: (colors?: BaseTheme) => {
      if (!theme) theme = createTheme(colors || DEFAULT_THEME);
      return theme;
    },
  };
})();

export default ThemeFactory;
