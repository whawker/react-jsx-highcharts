import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useModifiedProps, useChart } from 'react-jsx-highcharts';

const RangeSelectorInput = ({ enabled = true, ...restProps }) => {
  const chart = useChart();

  useEffect(() => {
    return () => {
      try {
        updateRangeSelectorInputs({ enabled: false }, chart);
      } catch {
        // ignore as chart might have been already unmounted
      }
    };
  }, []);

  const modifiedProps = useModifiedProps({ enabled, ...restProps });

  useEffect(() => {
    if (modifiedProps !== false) {
      updateRangeSelectorInputs(modifiedProps, chart);
    }
  });

  return null;
};

const upperFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const prefixPropsWithInput = config => {
  const prefixedConfig = {};
  Object.keys(config).forEach(key => {
    const newKey = key.indexOf('input') === 0 ? key : `input${upperFirst(key)}`;
    prefixedConfig[newKey] = config[key];
  });

  return prefixedConfig;
};

const updateRangeSelectorInputs = (config, chart) => {
  const inputProps = prefixPropsWithInput(config);

  chart.update({
    rangeSelector: {
      ...inputProps
    }
  });
};

RangeSelectorInput.propTypes = {
  update: PropTypes.func, // Provided by ChartProvider
  enabled: PropTypes.bool
};

export default RangeSelectorInput;
