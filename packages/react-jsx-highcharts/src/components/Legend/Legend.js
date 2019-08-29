import { useEffect, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';


const Legend = memo(({ children = null, enabled = true, ...restProps}) => {

  const modifiedProps = useModifiedProps({ enabled, ...restProps});

  const { getChart, needsRedraw } = useChart();

  const updateLegend = useCallback(config => {
    const chart = getChart();
    chart.update({
      legend: config
    }, false);
    needsRedraw();
  }, [getChart, needsRedraw]);

  // componentDidMount && componentDidUpdate
  useEffect(() => {
    if (modifiedProps !== false) {

      updateLegend(modifiedProps);
    }
  },[modifiedProps, updateLegend]);

  useEffect(() => {
    // componentWillUnmount
    return () => attempt(updateLegend, { enabled: false });
  },[updateLegend]);

  return children;
})

Legend.propTypes = {
  enabled: PropTypes.bool
}
Legend.displayName = Legend;

export default Legend;
