import * as React from 'react';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';
import useChart from '../UseChart';

const BarSeries = props => {
  const chart = useChart();

  useEffect(() => {
    chart.update({ chart: { inverted: true } });
  }, []);

  return <Series {...props} type="bar" />;
};
BarSeries.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
};
export default BarSeries;
