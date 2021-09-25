export function isErrorInstance(value: Error | unknown): value is Error {
  return value instanceof Error;
}
