import { DefaultColors } from '@ui/constants/colors';
import { MapTypes } from '@ui/constants/maps';

export type BaseColors = {
  foreground: string;
  background: string;
};

export type BaseMap = {
  url: MapTypes;
};
export type BaseTheme = BaseMap & BaseColors & { name: string; defaults?: typeof DefaultColors };

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
  tones: ColorThemeTones;
  functional: ColorThemeFunctional;
  complements?: string[];
};

export type TextTheme = {
  contrast_bg: string;
  blend_bg: string;
  contrast_fg: string;
  blend_fg: string;
};

export type Theme = {
  name: string;
  foreground: ColorTheme;
  background: ColorTheme;
  text: TextTheme;
  defaults: typeof DefaultColors;
  extras: {
    mapUrl: MapTypes;
  };
};
