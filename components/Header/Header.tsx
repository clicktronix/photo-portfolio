import { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';

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
        [styles.IsHeaderShow]: isMenuClicked,
      })}
    >
      <HamburgerMenu isClicked={isMenuClicked} onClick={onHamburgerClick} />
      <div
        className={cn(styles.Menu, {
          [styles.ShowMenu]: isMenuClicked,
          [styles.HideMenu]: !isMenuClicked,
        })}
      >
        <h1 className={styles.Title}>Kushebina.ph</h1>
        <nav>
          <Link href="/">
            <a className={styles.Link}>главная</a>
          </Link>
          <Link href="/albums">
            <a className={styles.Link}>альбомы</a>
          </Link>
          <Link href="/contacts">
            <a className={styles.Link}>контакты</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
