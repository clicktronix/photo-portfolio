import React, { ReactChild } from 'react';

import styles from './Layout.module.scss';

type Props = {
  withHeader: boolean;
  withFooter: boolean;
  children: ReactChild | ReactChild[];
};

export function Layout({ withHeader, withFooter, children }: Props) {
  return (
    <div className={styles.Wrapper}>
      {withHeader && <header className={styles.Header}>Kushebina.ph</header>}
      <main className={styles.Content}>{children}</main>
      {withFooter && <footer className={styles.Footer}>clicktronix@hotmail.com</footer>}
    </div>
  );
}
