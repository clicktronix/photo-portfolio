import { useRouter } from 'next/dist/client/router';
import cn from 'classnames';

import styles from './BackButton.module.scss';

type BackButtonProp = {
  className?: string;
};

export function BackButton({ className }: BackButtonProp) {
  const route = useRouter();

  const onButtonClickHandler = () => {
    route.back();
  };

  return (
    <div role="button" tabIndex={0} onClick={onButtonClickHandler} className={cn([styles.BackButton, className])}>
      <span />
    </div>
  );
}
