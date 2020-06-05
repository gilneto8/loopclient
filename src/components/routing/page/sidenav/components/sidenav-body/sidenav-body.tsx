import React from 'react';
import { ItemProps } from '../../../../../../logic/shared/map/map-types';
import ItemForm from './components/item-form';

type Props = {
  item: ItemProps | undefined;
};

const SidenavBody = (props: Props) => {
  return (
    <div>
      {!!props.item && <ItemForm item={props.item} />}
    </div>
  );
};

export default SidenavBody;
