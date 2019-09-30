import pickBy from './pickBy';

export default function getModifiedProps(
  prevProps,
  currProps,
  childrenIsText = false
) {
  let { children, ...rest } = currProps;

  const modifiedProps = pickBy(rest, (propName, value) => {
    if (!prevProps) return true;

    return Object.is(value, prevProps[propName]) === false;
  });

  if (
    childrenIsText &&
    (!prevProps || Object.is(prevProps.children, children) === false)
  ) {
    modifiedProps.text = children;
  }

  if (Object.keys(modifiedProps).length > 0) {
    return modifiedProps;
  }

  return false;
}
