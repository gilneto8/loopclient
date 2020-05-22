import React from 'react';
import { Page } from 'src/components/routing/page/page';
import { INDEX_ROUTE } from './index-routes';

export function IndexTemplate() {
  return <Page title={INDEX_ROUTE.label}>{() => <>TUFAS</>}</Page>;
}
