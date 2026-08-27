import * as React from 'react';
import { BaseChart, useHighcharts } from 'react-jsx-highcharts';

const HighchartsStockChart = props => {
  const Highcharts = useHighcharts();

  return (
    <BaseChart
      {...props}
      chartCreationFunc={Highcharts.stockChart}
      chartType="stockChart"
    />
  );
};

export default HighchartsStockChart;
