import styles from './NextButton.module.scss';

type NextButtonProps = {
  onClick: () => void;
};

export function NextButton({ onClick }: NextButtonProps) {
  return (
    <button className={styles.NextButton} onClick={onClick}>
      <div className={styles.NextButtonTop} />
      <div className={styles.NextButtonBottom} />
    </button>
  );
}
