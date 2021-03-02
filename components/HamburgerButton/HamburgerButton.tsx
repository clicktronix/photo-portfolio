import cn from 'classnames';
import React from 'react';

import styles from './Hamburger.module.scss';

type HamburgerMenuProps = {
  isClicked: boolean;
  onClick: () => void;
};

export const HamburgerMenu = React.memo(({ isClicked, onClick }: HamburgerMenuProps) => {
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
});

HamburgerMenu.displayName = 'HamburgerMenu';
