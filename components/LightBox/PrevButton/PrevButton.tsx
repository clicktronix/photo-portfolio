import styles from './PrevButton.module.scss';

type PrevButtonProps = {
  onClick: () => void;
};

export function PrevButton({ onClick }: PrevButtonProps) {
  return (
    <button className={styles.PrevButton} onClick={onClick}>
      <div className={styles.PrevButtonTop} />
      <div className={styles.PrevButtonBottom} />
    </button>
  );
}
