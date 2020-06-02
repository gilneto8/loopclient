import React from 'react';
import { useForm } from 'react-hook-form';
import { LineForm as LineFormType, LineProps, LineTypes } from '../map-types';

type Props = {
  line: LineProps;
};

const LineForm = (props: Props) => {
  const { register, handleSubmit, errors } = useForm<LineFormType>();
  const onSubmit = (data: LineFormType) => console.log(data);

  return (
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
  );
};

export default LineForm;
