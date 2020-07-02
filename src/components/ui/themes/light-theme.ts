import { BaseTheme } from '../colors/color-types';
import { MapTypes } from '@ui/constants/maps';
import { DefaultColors } from '@ui/constants/colors';

const foreground = 'rgb(223,131,2)';
const background = 'rgb(200,208,209)';

const map = MapTypes.light;

const lightTheme: BaseTheme = {
  name: 'Light',
  foreground,
  background,
  url: map,
  defaults: DefaultColors,
};

export default lightTheme
