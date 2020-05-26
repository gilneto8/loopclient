import React, { ReactNode } from 'react';

type Props = {
  children: () => ReactNode;
  title: string;
};

/*
* TODO
*  - authentication rules here
*  - header element here, agnostic from place on page
*  - react-helmet to manager HEAD tags
*
*/
export function Page(props: Props): JSX.Element {
  return (
    <>
      <main title={props.title}>{props.children()}</main>
    </>
  );
}
