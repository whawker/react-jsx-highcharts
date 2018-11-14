import { mapValues } from 'lodash-es';
import { isPlainObject } from 'lodash-es';

const FROM_HIGHCHARTS_PROVIDER = 'getHighcharts';
const FROM_CHART_PROVIDER = 'getChart';
const FROM_AXIS_PROVIDER = 'getAxis';
const FROM_SERIES_PROVIDER = 'getSeries';

const DEBOUNCED_REDRAW = 'needsRedraw';

export const PROVIDED_PROPS = [
  FROM_HIGHCHARTS_PROVIDER,
  FROM_CHART_PROVIDER,
  FROM_AXIS_PROVIDER,
  FROM_SERIES_PROVIDER,
  DEBOUNCED_REDRAW
];

function cleanConfig(config = {}) {
  // omit provided props
  return Object.keys(config)
    .filter(key => PROVIDED_PROPS.indexOf(key) < 0)
    .reduce((object, key) => {
      object[key] = config[key];
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
  return (config, ...rest) => {
    const cleanedConfig = deepCleanConfig(config);
    return func(cleanedConfig, ...rest);
  };
}
