import React, { ReactNode } from 'react';
import Header from './header/header';
import './page-styles.scss';

type Props = {
  children: () => ReactNode;
  title: string;
};

export function Page(props: Props): JSX.Element {
  return (
    <div className="d-flex flex-column vh-100 page">
      <Header />
      <div className="flex-grow-1 p-3">
        {props.children()}
      </div>
    </div>
  );
}
