import styles from './Spinner.module.scss';

export function Spinner() {
  return (
    <div className={styles.Spinner}>
      <div className={styles.Cube1} />
      <div className={styles.Cube2} />
    </div>
  );
}
