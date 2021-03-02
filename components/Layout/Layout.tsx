import React, { ReactChild } from 'react';

import { Header } from 'components/Header/Header';

import styles from './Layout.module.scss';

type Props = {
  withFooter: boolean;
  children: ReactChild | ReactChild[];
};

export const Layout = React.memo(({ withFooter, children }: Props) => {
  return (
    <div className={styles.Wrapper}>
      <Header />
      <main className={styles.Content}>{children}</main>
      {withFooter && <footer className={styles.Footer}>clicktronix@hotmail.com</footer>}
    </div>
  );
});

Layout.displayName = 'Layout';
