import React, { ReactNode } from 'react';

type Props = {
  children: () => ReactNode;
  title: string;
};

export function Page(props: Props) {
  return (
    <>
      <main>{props.children()}</main>
    </>
  );
}
