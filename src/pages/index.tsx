import { Page } from '../components/routing/page/page';
import { navigate } from 'gatsby';
import React from 'react';
import Button from '../components/form/Button/button';
import { TUFAS_ROUTE } from "../components/routing/tufas-routes"

const IndexTemplate = (): JSX.Element => (
  <Page title={'Landing Page'}>
    {() => (
      <>
        <Button
          onClick={() => {
            return navigate(TUFAS_ROUTE.getHref());
          }}
        >
          Go to Tufas
        </Button>
      </>
    )}
  </Page>
);

export default IndexTemplate;
