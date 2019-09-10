import { isEqual } from 'lodash-es';
import { pickBy } from 'lodash-es';

export default function getModifiedProps (prevProps, currProps, childrenIsText = false) {
  let { children, ...rest } = currProps;

  const modifiedProps = pickBy(rest, (value, propName) => {
    if (!prevProps) return true;

    return isEqual(value, prevProps[propName]) === false;
  });

  if (childrenIsText && (!prevProps || isEqual(prevProps.children, children) === false)) {
    modifiedProps.text = children;
  }

  if (Object.keys(modifiedProps).length > 0) {
    return modifiedProps;
  }

  return false;
}
