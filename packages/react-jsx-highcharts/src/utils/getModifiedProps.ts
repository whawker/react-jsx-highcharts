import pickBy from './pickBy';

const getModifiedProps = function <P>(
  prevProps: P,
  currProps: P,
  childrenIsText = false
) {
  // @ts-expect-error TODO
  const { children, ...rest } = currProps;

  const modifiedProps = pickBy(rest, (propName, value) => {
    if (!prevProps) return true;

    return Object.is(value, prevProps[propName]) === false;
  });

  if (
    childrenIsText &&
    // @ts-expect-error TODO
    (!prevProps || Object.is(prevProps.children, children) === false)
  ) {
    // @ts-expect-error TODO
    modifiedProps.text = children;
  }

  if (Object.keys(modifiedProps).length > 0) {
    return modifiedProps;
  }

  return false;
};

export default getModifiedProps;
