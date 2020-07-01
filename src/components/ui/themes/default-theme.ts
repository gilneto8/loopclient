import { BaseTheme } from '../colors/color-types';
import { MapTypes } from '@ui/constants/maps';
import { DefaultColors } from '@ui/constants/colors';

const foreground = 'rgb(0,232,125)';
const background = 'rgb(0,30,76)';

const map = MapTypes.dark;

const DEFAULT_THEME: BaseTheme = {
  foreground,
  background,
  url: map,
  defaults: DefaultColors,
};

export default DEFAULT_THEME;
