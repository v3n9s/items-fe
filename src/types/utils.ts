export type ReplaceValuesWithNull<T> = {
  [key in keyof T]: null;
}
