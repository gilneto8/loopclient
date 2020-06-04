import React from 'react';
import Label from '../../../../../ui/components/Label/label';

type Props = {};

const SidenavHeader = React.memo<Props>(() => {
  return (
    <div>
      <Label paddings={[30, 0, 0, 30]}>{'what the fuck did you just say you little shit'}</Label>
    </div>
  );
});

export default SidenavHeader;
