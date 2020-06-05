import React from 'react';
import Label from '../../../../../ui/components/Label/label';

type Props = {
  title?: string;
};

const SidenavHeader = React.memo<Props>((props) => {
  return (
    <div>
      <Label
        paddings={[30, 0, 0, 30]}
        borders={{ thickness: [0, 0, 1, 0], color: 'white', type: 'solid' }}
        margins={[0, 0, 30, 0]}
      >
        {props.title || 'Placeholder Header'}
      </Label>
    </div>
  );
});

export default SidenavHeader;
