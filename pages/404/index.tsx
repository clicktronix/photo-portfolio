import { ErrorProps } from 'next/error';

import Error from '../_error';

export default function Custom404({ statusCode }: ErrorProps) {
  return <Error statusCode={statusCode} title="Page is not found" />;
}
