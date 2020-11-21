import { useState } from 'react';
import { HamburgerMenu } from '../HamburgerButton/HamburgerButton';
import styles from './Header.module.scss';

export function Header() {
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const onHamburgerClick = () => {
    setIsMenuClicked((s) => !s);
  };

  return (
    <header className={styles.Header}>
      <HamburgerMenu isClicked={isMenuClicked} onClick={onHamburgerClick} />

      <nav className={styles.Menu}>
        <a href="1">фото</a>
        <a href="2">альбомы</a>
        <a href="3">контакты</a>
      </nav>
    </header>
  );
}
