import React from 'react';
import { ItemProps, LineForm, LineTypes, MarkerForm } from '../../../../../../logic/shared/map/map-types';
import { useForm } from 'react-hook-form';
import Label from '../../../../../ui/components/Label/label';

type Props = {
  item: ItemProps | undefined;
};

const SidenavBody = React.memo<Props>((props: Props) => {
  const { register, handleSubmit, errors } = useForm<LineForm | MarkerForm>({
    defaultValues: props.item?.data || undefined,
  });
  const onSubmit = (data: LineForm | MarkerForm) => {
    console.log(data);
  };
  return (
    <div>
      <Label paddings={[30, 0, 0, 30]}>{!props.item ? 'nothing...' : props.item.data.name}</Label>
      {!!props.item && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name={'name'} ref={register({ required: true })}>
            {errors.name && <span>{'Please specify a name.'}</span>}
          </input>
          <select name={'type'} ref={register({ required: true })}>
            <option value={LineTypes.PLANE}>{'By plane'}</option>
            <option value={LineTypes.PEDESTRIAN}>{'By foot'}</option>
            <option value={LineTypes.BOAT}>{'By boat'}</option>
            <option value={LineTypes.TRAIN}>{'By train'}</option>
          </select>
          <input name={'description'} ref={register} />
          <input type={'submit'} />
        </form>
      )}
    </div>
  );
});

export default SidenavBody;
