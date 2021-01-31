import cn from 'classnames';
import styles from './CloseButton.module.scss';

type CloseButtonProps = {
  classes?: string;
  tabIndex?: number;
  onClick: () => void;
};

export function CloseButton({ tabIndex, classes, onClick }: CloseButtonProps) {
  return (
    <span
      role="button"
      tabIndex={tabIndex}
      className={cn([styles.CloseButton, classes])}
      onClick={onClick}
    />
  );
}
