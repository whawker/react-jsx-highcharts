import { mapValues } from 'lodash-es';
import { isPlainObject } from 'lodash-es';
import { wrap } from 'lodash-es';

const FROM_HIGHCHARTS_PROVIDER = 'getHighcharts';
const FROM_CHART_PROVIDER = 'getChart';
const FROM_AXIS_PROVIDER = 'getAxis';
const FROM_SERIES_PROVIDER = 'getSeries';

export const PROVIDED_PROPS = [
  FROM_HIGHCHARTS_PROVIDER,
  FROM_CHART_PROVIDER,
  FROM_AXIS_PROVIDER,
  FROM_SERIES_PROVIDER
];

function cleanConfig(config) {
  return Object.keys(config).reduce((object, key) => {
    if (PROVIDED_PROPS.indexOf(key) < 0) {
      object[key] = config[key];
    }
    return object;
  }, {});
}

function deepCleanConfig (config) {
  const cleanedRoot = cleanConfig(config);
  return mapValues(cleanedRoot, prop => {
    if (isPlainObject(prop) === false) return prop;

    return deepCleanConfig(prop);
  });
}

export default function removeProvidedProps (func) {
  return wrap(func, function (origFunc, config, ...rest) {
    const cleanedConfig = deepCleanConfig(config);
    return origFunc(cleanedConfig, ...rest);
  });
}
