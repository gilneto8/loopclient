import React, { ReactNode } from 'react';

type Props = {
  children: () => ReactNode;
  title: string;
};

export function Page(props: Props): JSX.Element {
  return (
    <>
      <main title={props.title}>{props.children()}</main>
    </>
  );
}
