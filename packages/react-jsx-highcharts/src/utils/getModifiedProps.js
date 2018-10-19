import { isEqual } from 'lodash-es';
import { pickBy } from 'lodash-es';
import { size } from 'lodash-es';
import { PROVIDED_PROPS } from './removeProvidedProps';

export default function getModifiedProps (prevProps, currProps, childrenIsText = false) {
  let { children, ...rest } = currProps;

  const modifiedProps = pickBy(rest, (value, propName) => {
    if (PROVIDED_PROPS.indexOf(propName) > -1) return false;

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
