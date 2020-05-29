import React from 'react';
import { Page } from '../../components/routing/page/page';
import { Alert } from "react-bootstrap"

const Index = (): JSX.Element => (
  <Page title={'Landing Page'}>
    {() => (
      <>
        <Alert variant={'primary'}>Nothing to see here</Alert>
      </>
    )}
  </Page>
);

export default Index;
