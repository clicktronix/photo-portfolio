import { useState } from 'react';
import cn from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { routes } from 'pages/constants';

import { HamburgerButton } from '../HamburgerButton/HamburgerButton';

import styles from './Header.module.scss';

export function Header() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const { pathname } = useRouter();

  const onHamburgerClick = () => {
    setIsMenuClicked((s) => !s);
  };

  return (
    <header
      className={cn(styles.Header, {
        [styles.IsHeaderShow]: isMenuClicked,
      })}
    >
      <div className={styles.HamburgerButton}>
        <HamburgerButton isClicked={isMenuClicked} onClick={onHamburgerClick} />
      </div>
      {isMenuClicked && (
        <div
          className={cn(styles.Menu, {
            [styles.ShowMenu]: isMenuClicked,
          })}
        >
          <h1 className={styles.Title}>Kushebina.ph</h1>
          <nav>
            {pathname !== routes.default && (
              <Link href={routes.default}>
                <a className={styles.Link}>главная</a>
              </Link>
            )}
            {pathname !== routes.albums && (
              <Link href={routes.albums}>
                <a className={styles.Link}>альбомы</a>
              </Link>
            )}
            {pathname !== routes.contacts && (
              <Link href={routes.contacts}>
                <a className={styles.Link}>контакты</a>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
