import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import isPlainObject from 'lodash.isplainobject';
import { getProvidedProps } from './providedProps';

export default function cleanPropsBeforeUpdate (wrappedUpdate) {
  return (config, ...args) => {
    const cleanedRoot = removeProviderProps(config);
    const cleanedNested = mapValues(cleanedRoot, prop => {
      if (isPlainObject(prop) === false) return prop;

      return removeProviderProps(prop);
    });

    wrappedUpdate(cleanedNested, ...args);
  }
}

function removeProviderProps (config) {
  return omit(config, getProvidedProps());
}
