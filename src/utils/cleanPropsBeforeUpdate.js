import mapValues from 'lodash.mapvalues';
import omit from 'lodash.omit';
import isPlainObject from 'lodash.isplainobject';

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
  const providedProps = [
    'get', 'update', 'remove', 'addAxis',
    'addSeries', 'setData', 'setVisible',
    'addPlotBand', 'removePlotBand'
  ];
  return omit(config, providedProps);
}
