import React from 'react';
import { useForm } from 'react-hook-form';
import { MarkerForm as MarkerFormType, MarkerProps, MarkerTypes } from '../map-types';

type Props = {
  marker: MarkerProps;
};

const MarkerForm = (props: Props) => {
  const { register, handleSubmit, errors } = useForm<MarkerFormType>();
  const onSubmit = (data: MarkerFormType) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input name={'name'} ref={register({ required: true })}>
        {errors.name && <span>{'Please specify a name.'}</span>}
      </input>
      <select name={'type'} ref={register({ required: true })}>
        <option value={MarkerTypes.POI}>{'Point of interest'}</option>
        <option value={MarkerTypes.HOTEL}>{'Place to stay'}</option>
        <option value={MarkerTypes.SIGHTSEEING}>{'Sightseeing point'}</option>
        <option value={MarkerTypes.TRANSPORT}>{'Transportation'}</option>
      </select>
      <input name={'description'} ref={register} />
      <input type={'submit'} />
    </form>
  );
};

export default MarkerForm;
