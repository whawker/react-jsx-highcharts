// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function <T extends Record<string, any>>(
  obj: T,
  filterFn: (propName: keyof T, value: T[keyof T]) => boolean
): Partial<T> {
  const retProps: Partial<T> = {};
  if (obj) {
    (Object.keys(obj) as (keyof T)[])
      .filter(key => filterFn(key, obj[key]))
      .forEach(key => {
        retProps[key] = obj[key];
      });
  }
  return retProps;
}
