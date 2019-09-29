export default function (obj, filterFn) {
  const retProps = {}
  if (obj) {
    Object.entries(obj)
      .filter(([key, value]) => filterFn(key, value))
      .forEach(([key, value]) => {
        retProps[key] = value
      })
  }
  return retProps
}
