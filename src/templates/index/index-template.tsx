import React from 'react';
import { Page } from '../../components/routing/page/page';
import { Alert } from "react-bootstrap"

const Index = (): JSX.Element => (
  <Page title={'Landing Page'}>
    {() => (
      <>
        {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant, idx) => (
          /*// @ts-ignore*/
          <Alert key={idx} variant={variant}>
            This is a {variant} alert—check it out!
          </Alert>
        ))}
      </>
    )}
  </Page>
);

export default Index;
