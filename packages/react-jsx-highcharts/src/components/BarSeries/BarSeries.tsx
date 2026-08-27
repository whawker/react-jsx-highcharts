import * as React from 'react';
import { useEffect } from 'react';
import Series from '../Series';
import useChart from '../UseChart';

const BarSeries = props => {
  const chart = useChart();

  useEffect(() => {
    chart.update({ chart: { inverted: true } });
  }, []);

  return <Series {...props} type="bar" />;
};

export default BarSeries;
