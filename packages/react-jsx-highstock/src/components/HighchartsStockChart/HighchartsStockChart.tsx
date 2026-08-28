import * as React from 'react';
import { BaseChart, useHighcharts } from 'react-jsx-highcharts';

import type { HighchartsChart } from 'react-jsx-highcharts';

import type { ComponentProps } from 'react';
// side effect import to include Highcharts.stockChart
import type {} from 'highcharts/highstock';

type HighchartsStockChartProps = ComponentProps<typeof HighchartsChart>;

const HighchartsStockChart = (props: HighchartsStockChartProps) => {
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
