export function* generatorFromArr<T>(photos: T[]) {
  yield* photos;
}
