import { LineObj } from '@logic/features/trip/line-types';
import { createLine } from '@utils/line-utils/create-line';

export function invertLine(line: LineObj): LineObj {
  return createLine(line.geometry.end, line.geometry.start);
}
