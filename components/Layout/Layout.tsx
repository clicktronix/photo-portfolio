import React, { ReactChild } from 'react';

import styles from './Layout.module.scss';

type Props = {
  withFooter: boolean;
  children: ReactChild | ReactChild[];
};

export const Layout = ({ withFooter, children }: Props) => (
  <div className={styles.Wrapper}>
    <header>HEADER</header>
    <main className={styles.Content}>{children}</main>
    {withFooter && (
      <footer className={styles.Footer}>clicktronix@hotmail.com</footer>
    )}
  </div>
);
