import { Page } from '../components/routing/page/page';
import { navigate } from 'gatsby';
import React from 'react';
import Button from '../components/form/Button/button';
import { SECOND_PAGE_ROUTE } from '../components/routing/second-page-routes';


/*
* TODO
*  - (*) configure SASS?
*  - (PAGE) authentication rules here
*  - (PAGE) header element here, agnostic from place on page
*  - (PAGE) react-helmet to manager HEAD tags
*
*/

const Index = (): JSX.Element => (
  <Page title={'Landing Page'}>
    {() => (
      <>
        <Button
          onClick={() => {
            return navigate(SECOND_PAGE_ROUTE.getHref());
          }}
        >
          Go to Second Page
        </Button>
      </>
    )}
  </Page>
);

export default Index;
