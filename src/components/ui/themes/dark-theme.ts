import { BaseTheme } from '../colors/color-types';
import { MapTypes } from '@ui/constants/maps';
import { DefaultColors } from '@ui/constants/colors';

const foreground = 'rgb(137,38,38)';
const background = 'rgb(57,57,57)';

const map = MapTypes.dark;

const darkTheme: BaseTheme = {
  name: 'Dark',
  foreground,
  background,
  url: map,
  defaults: DefaultColors,
};

export default darkTheme;
