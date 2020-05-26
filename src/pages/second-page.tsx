import { Page } from '../components/routing/page/page';
import { navigate } from 'gatsby';
import React from 'react';
import Button from '../components/form/Button/button';
import { LANDING_PAGE_ROUTE } from '../components/routing/landing-page-routes';

const SecondPage = (): JSX.Element => (
  <Page title={'Second Page'}>
    {() => (
      <>
        SECOND PAGE CRL
        <Button
          onClick={() => {
            return navigate(LANDING_PAGE_ROUTE.getHref());
          }}
        >
          Go back
        </Button>
      </>
    )}
  </Page>
);

export default SecondPage;
