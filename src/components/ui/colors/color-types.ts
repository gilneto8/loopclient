export const DefaultColors = {
  black: 'rgb(17,17,17)',
  white: 'rgb(255,238,220)',
  grey: 'rgb(135,134,132)',
  danger: 'rgb(238,59,59)',
  warning: 'rgb(246,191,34)',
  success: 'rgb(62,187,50)',
};

export type BaseColors = {
  foreground: string;
  background: string;
};
export type BaseTheme = BaseColors & { defaults: typeof DefaultColors };

export type ColorThemeTones = {
  l_10: string;
  l_30: string;
  l_50: string;
  d_10: string;
  d_30: string;
  d_50: string;
};

export type ColorThemeFunctional = {
  hovering: string;
  selected: string;
  disabled: string;
};

export type ColorTheme = {
  color: string;
  tones?: ColorThemeTones;
  functional?: ColorThemeFunctional;
  complements?: string[];
};

export type TextTheme = {
  contrast_bg: string;
  blend_bg: string;
  contrast_fg: string;
  blend_fg: string;
};

export type Theme = {
  foreground: ColorTheme;
  background: ColorTheme;
  text: TextTheme;
  defaults: typeof DefaultColors;
};
