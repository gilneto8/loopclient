import tinycolor from 'tinycolor2';
import { ColorTheme, TextTheme, Theme } from './color-types';

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

const mainForegroundColor = 'rgb(0,232,125)';
const mainBackgroundColor = 'rgb(28,0,106)';

export const DEFAULT_THEME: Theme = createTheme(mainForegroundColor, mainBackgroundColor);
export default createTheme;
