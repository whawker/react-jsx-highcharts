import * as React from 'react';
import BaseChart from '../BaseChart';
import useHighcharts from '../UseHighcharts';

const HighchartsChart = props => {
  const Highcharts = useHighcharts();

  return (
    <BaseChart
      {...props}
      chartCreationFunc={Highcharts.chart}
      chartType="chart"
    />
  );
};

export default HighchartsChart;
