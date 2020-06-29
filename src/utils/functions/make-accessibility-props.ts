import React from 'react';

export function makeAccessibleButtonProps(fn: (...args: any) => void, role?: string) {
  return {
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      e.preventDefault();
      return fn();
    },
    onKeyPress: (e: React.KeyboardEvent<HTMLElement>) => {
      /*
        TIP:
        you can use the HTML element type from the event
        to change the accessibility behaviour.
      */
      // if(e.target instanceof HTMLDivElement){
      //   // Do something
      // }

      if (e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        return fn();
      }
    },
    role: role ?? 'button'
  };
}
