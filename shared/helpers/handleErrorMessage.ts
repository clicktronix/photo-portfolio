import { isErrorInstance } from 'shared/guards/isErrorInstance';

export function handleErrorMessage(error: Error | unknown) {
  return isErrorInstance(error) ? error.message : 'Something went wrong';
}
