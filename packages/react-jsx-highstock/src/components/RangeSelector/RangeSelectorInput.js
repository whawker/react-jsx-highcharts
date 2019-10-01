import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { attempt, mapKeys, upperFirst } from 'lodash-es';
import { useModifiedProps, useChart } from 'react-jsx-highcharts';

const RangeSelectorInput = ({ enabled = true, ...restProps }) => {
  const chart = useChart();

  useEffect(() => {
    return () => {
      attempt(updateRangeSelectorInputs, { enabled: false }, chart);
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

const prefixPropsWithInput = config => {
  return mapKeys(config, (value, key) => {
    return key.indexOf('input') === 0 ? key : `input${upperFirst(key)}`;
  });
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
  enabled: PropTypes.bool.isRequired
};

export default RangeSelectorInput;
