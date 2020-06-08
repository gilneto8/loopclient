export type ColorThemeTones = {
  l_10: tinycolorInstance;
  l_30: tinycolorInstance;
  l_50: tinycolorInstance;
  d_10: tinycolorInstance;
  d_30: tinycolorInstance;
  d_50: tinycolorInstance;
};

export type ColorThemeFunctional = {
  hovering: tinycolorInstance;
  selected: tinycolorInstance;
  disabled: tinycolorInstance;
};

export type ColorTheme = {
  color: tinycolorInstance;
  tones?: ColorThemeTones;
  functional?: ColorThemeFunctional;
  complements?: ColorTheme[];
};

export type TextTheme = {
  contrast_bg: tinycolorInstance;
  blend_bg: tinycolorInstance;
  contrast_fg: tinycolorInstance;
  blend_fg: tinycolorInstance;
};