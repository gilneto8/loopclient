import React from 'react';
import Label from '../../../../../ui/components/Label/label';
import { ItemProps } from '../../../../../../logic/shared/map/map-types';

type Props = {
  item: ItemProps | undefined;
};

const SidenavBody = React.memo<Props>((props: Props) => {
  return (
    <div>
      <Label paddings={[30, 0, 0, 30]}>{!props.item ? 'nothing...' : props.item.data.name}</Label>
    </div>
  );
});

export default SidenavBody;
