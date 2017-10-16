import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
import { getProvidedProps } from './providedProps';

export default function removeProvidedProps (config) {
  const cleanedRoot = cleanProps(config);
  return mapValues(cleanedRoot, prop => {
    if (isPlainObject(prop) === false) return prop;

    return cleanProps(prop);
  });
}

function cleanProps (config) {
  return omit(config, getProvidedProps());
}
