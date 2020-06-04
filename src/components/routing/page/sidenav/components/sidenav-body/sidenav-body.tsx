import React from 'react';
import Label from '../../../../../ui/components/Label/label';
import { ItemProps } from '../../../../../../logic/shared/map/map-types';

type Props = {
  data: ItemProps | undefined;
};

const SidenavBody = React.memo<Props>((props: Props) => {
  return (
    <div>
      <Label paddings={[30, 0, 0, 30]}>{!props.data ? 'nothing...' : 'you heard me motherfucker'}</Label>
    </div>
  );
});

export default SidenavBody;
