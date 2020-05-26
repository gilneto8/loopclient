import React, { ReactNode } from 'react';
import Header from './header/header';

type Props = {
  children: () => ReactNode;
  title: string;
};

export function Page(props: Props): JSX.Element {
  return (
    <>
      <Header />
      <main title={props.title}>{props.children()}</main>
    </>
  );
}
