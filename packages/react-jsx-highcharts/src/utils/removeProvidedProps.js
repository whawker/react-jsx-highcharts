import mapValues from 'lodash/mapValues';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';

export default function removeProvidedProps (config) {
  const cleanedRoot = cleanProps(config);
  return mapValues(cleanedRoot, prop => {
    if (isPlainObject(prop) === false) return prop;

    return cleanProps(prop);
  });
}

function cleanProps (config) {
  return omit(config, ['getHighcharts', 'getChart', 'getAxis', 'getSeries']);
}
