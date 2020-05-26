import { Page } from '../components/routing/page/page';
import { navigate } from 'gatsby';
import React from 'react';
import Button from '../components/form/Button/button';
import { INDEX_ROUTE } from '../components/routing/index-routes';

const IndexTemplate = (): JSX.Element => (
  <Page title={'Landing Page'}>
    {() => (
      <>
        TUFAS CRL
        <Button
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

export default IndexTemplate;
