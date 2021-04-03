import { ErrorProps } from 'next/error';

import Error from '../_error';

export default function Custom500({ statusCode }: ErrorProps) {
  return <Error statusCode={statusCode} title="Something went wrong on the server side" />;
}
