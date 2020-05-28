import { Page } from '../components/routing/page/page';
import { navigate } from 'gatsby';
import React from 'react';
import Button from '../components/form/Button/button';
import { INDEX_ROUTE } from '../components/routing/index-routes';

const SecondPage = (): JSX.Element => (
  <Page title={'Second Page'}>
    {() => (
      <>
        SECOND PAGE CRL
        <Button
          title={`go to ${INDEX_ROUTE.label}`}
          onClick={() => {
            return navigate(INDEX_ROUTE.getHref());
          }}
        >
          Go back
        </Button>
      </>
    )}
  </Page>
);

export default SecondPage;
