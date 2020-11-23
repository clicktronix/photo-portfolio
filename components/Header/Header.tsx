import { useState } from 'react';
import cn from 'classnames';

import { HamburgerMenu } from '../HamburgerButton/HamburgerButton';
import styles from './Header.module.scss';

export function Header() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const onHamburgerClick = () => {
    setIsMenuClicked((s) => !s);
  };

  return (
    <header
      className={cn(styles.Header, {
        [styles.IsBlur]: isMenuClicked,
      })}
    >
      <HamburgerMenu isClicked={isMenuClicked} onClick={onHamburgerClick} />
      <nav
        className={cn(styles.Menu, {
          [styles.ShowMenu]: !isMenuClicked,
        })}
      >
        <a href="1" className={styles.Link}>
          фото
        </a>
        <a href="2" className={styles.Link}>
          альбомы
        </a>
        <a href="3" className={styles.Link}>
          контакты
        </a>
      </nav>
    </header>
  );
}
