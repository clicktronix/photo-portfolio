import styles from './Header.module.scss';

export function Header() {
  return (
    <header className={styles.Header}>
      <nav className={styles.Menu}>
        <a href="1">фото</a>
        <a href="2">альбомы</a>
        <a href="3">контакты</a>
      </nav>
    </header>
  );
}
