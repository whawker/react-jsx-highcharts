import isEqual from 'lodash/isEqual';
import pickBy from 'lodash/pickBy';
import size from 'lodash/size';
import { getProvidedProps } from './providedProps';

export default function getModifiedProps (prevProps, currProps, childrenIsText = false) {
  let { children, ...rest } = currProps;

  const providedProps = getProvidedProps();
  const modifiedProps = pickBy(rest, (value, propName) => {
    if (providedProps.indexOf(propName) > -1) return false;

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
