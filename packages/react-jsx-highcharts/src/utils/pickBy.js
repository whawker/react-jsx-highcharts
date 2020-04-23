export default function (obj, filterFn) {
  let retProps = {};
  if (obj) {
    Object.keys(obj)
      .filter(key => filterFn(key, obj[key]))
      .forEach(key => {
        retProps[key] = obj[key];
      });
  }
  return retProps;
}
