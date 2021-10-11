import cn from 'classnames';
import React from 'react';

import styles from './HamburgerButton.module.scss';

type HamburgerButtonProps = {
  isClicked: boolean;
  onClick: () => void;
};

export function HamburgerButton({ isClicked, onClick }: HamburgerButtonProps) {
  return (
    <div
      className={cn(styles.HamburgerIcon, {
        [styles.Active]: isClicked,
      })}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <span className={cn(styles.Line, styles.FirstLine)}></span>
      <span className={cn(styles.Line, styles.SecondLine)}></span>
      <span className={cn(styles.Line, styles.ThirdLine)}></span>
    </div>
  );
}
