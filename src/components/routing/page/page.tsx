import React, { ReactNode } from 'react';
import Header from './header/header';

type Props = {
  children: () => ReactNode;
  title: string;
};

export function Page(props: Props): JSX.Element {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="flex-grow-1 container p-3">
        <main title={props.title}>{props.children()}</main>
      </div>
    </div>
  );
}
