export type BaseColors = {
  foreground: string;
  background: string;
};

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
};
