import { Error } from 'components/Error/Error';
import { NextPageContext } from 'next';
import { ErrorProps } from 'next/error';

function CustomError({ statusCode, title }: ErrorProps) {
  return <Error statusCode={statusCode} title={title} />;
}

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode, title: err?.message };
};

export default CustomError;
