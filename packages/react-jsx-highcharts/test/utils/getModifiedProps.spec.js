import getModifiedProps from '../../src/utils/getModifiedProps';

describe('utils/getModifiedProps', () => {

  it('should return only modified props', () => {
    const prevProps = {
      firstProp: true,
      secondProp: true
    };

    const currProps = {
      firstProp: true,
      secondProp: false
    };

    const returnedProps = getModifiedProps(prevProps, currProps, false);
    expect(returnedProps).toEqual({ secondProp: false });

  });

  it('should return false for non modified props', () => {
    const prevProps = {
      firstProp: true,
      secondProp: true
    };

    const returnedProps = getModifiedProps(prevProps, prevProps, false);
    expect(returnedProps).toEqual(false);
  });
});
/*
import { isEqual } from 'lodash-es';
import { pickBy } from 'lodash-es';
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

  if (Object.keys(modifiedProps).length > 0) {
    return modifiedProps;
  }

  return false;
}

*/
