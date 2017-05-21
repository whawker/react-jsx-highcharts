import isEqual from 'lodash.isequal';
import pickBy from 'lodash.pickby';
import size from 'lodash.size';

export default function getModifiedProps (prevProps, currProps, childrenIsText = false) {
  let { children, ...rest } = currProps;

  const modifiedProps = pickBy(rest, (value, propName) => {
    return isEqual(value, prevProps[propName]) === false;
  });

  if (childrenIsText && isEqual(prevProps.children, children) === false) {
    modifiedProps.text = children;
  }

  if (size(modifiedProps) > 0) {
    return modifiedProps;
  }

  return false;
}
