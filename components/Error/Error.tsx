import { Layout } from 'components/Layout/Layout';

import styles from './Error.module.scss';

type ErrorProps = {
  statusCode?: number;
  title?: string;
};

export function Error({ title, statusCode }: ErrorProps) {
  return (
    <Layout withFooter>
      <p className={styles.Error}>
        {statusCode ?? null} {title ?? 'Something went wrong'}
      </p>
    </Layout>
  );
}
