export function* generatorFromArr<T>(elements: T[]) {
  yield* elements;
}
