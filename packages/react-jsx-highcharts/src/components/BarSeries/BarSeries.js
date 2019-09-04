import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';
import useChart from '../UseChart';

const BarSeries = (props) => {
  const { getChart } = useChart();

  useEffect(() => {
    const chart = getChart();
    chart.update({
      chart: {
        inverted: true
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Series {...props} type="bar" />
  );
}
BarSeries.propTypes = {
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ])
};
export default BarSeries;
