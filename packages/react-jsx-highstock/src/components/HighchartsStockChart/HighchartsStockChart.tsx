import * as React from 'react';
import { BaseChart, useHighcharts } from 'react-jsx-highcharts';

import type { HighchartsChartProps } from 'react-jsx-highcharts';
// side effect import to include Highcharts.stockChart
import type {} from 'highcharts/highstock';

const HighchartsStockChart = (props: HighchartsChartProps) => {
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
