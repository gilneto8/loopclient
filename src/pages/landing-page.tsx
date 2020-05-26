import { Page } from '../components/routing/page/page';
import { navigate } from 'gatsby';
import React from 'react';
import Button from '../components/form/Button/button';
import { SECOND_PAGE_ROUTE } from '../components/routing/second-page-routes';

const LandingPage = (): JSX.Element => (
  <Page title={'Landing Page'}>
    {() => (
      <>
        <Button
          onClick={() => {
            return navigate(SECOND_PAGE_ROUTE.getHref());
          }}
        >
          Go to Tufas
        </Button>
      </>
    )}
  </Page>
);

export default LandingPage;
