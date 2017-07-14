import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
import { getProvidedProps } from './providedProps';

export default function cleanPropsBeforeUpdate (wrappedUpdate) {
  return (config, ...args) => {
    const cleanedRoot = removeProviderProps(config);
    const cleanedNested = mapValues(cleanedRoot, prop => {
      if (isPlainObject(prop) === false) return prop;

      return removeProviderProps(prop);
    });

    return wrappedUpdate(cleanedNested, ...args);
  }
}

function removeProviderProps (config) {
  return omit(config, getProvidedProps());
}
