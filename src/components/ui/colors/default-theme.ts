import tinycolor from 'tinycolor2';
import { ColorTheme, TextTheme } from './color-types';

const mainForegroundColor = '#00e87d';
const mainBackgroundColor = '#1c006a';

const getColorFunctions = (color: string, generateComplements: boolean = false): ColorTheme => ({
  color: tinycolor(color).saturate(13),
  /*tones: {
    l_10: color.brighten(10),
    l_30: color.brighten(30),
    l_50: color.brighten(50),
    d_10: color.darken(10),
    d_30: color.darken(30),
    d_50: color.darken(50),
  },
  functional: {
    hovering: color.brighten(10),
    selected: color.brighten(30),
    disabled: color.desaturate(30),
  },
  complements: !generateComplements ? [] : color.tetrad().map((color) => {
    return getColorFunctions(color)
  }),*/
});

const getTextFunctions = (fg: string, bg: string): TextTheme => ({
  contrast_bg: tinycolor(fg).desaturate(25),
  blend_bg: tinycolor(bg).lighten(25),
  contrast_fg: tinycolor(bg).desaturate(25),
  blend_fg: tinycolor(fg).darken(15),
});

const DEFAULT_THEME = {
  foreground: getColorFunctions(mainForegroundColor, true),
  background: getColorFunctions(mainBackgroundColor, true),
  text: getTextFunctions(mainForegroundColor, mainBackgroundColor),
};

export default DEFAULT_THEME;
