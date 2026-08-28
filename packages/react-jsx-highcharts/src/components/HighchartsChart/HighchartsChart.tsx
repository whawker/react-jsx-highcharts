import * as React from 'react';
import BaseChart from '../BaseChart';
import useHighcharts from '../UseHighcharts';

import type { ReactNode } from 'react';

import type { Chart } from 'highcharts';
import type { Options } from 'highcharts';

export type HighchartsChartProps = {
  callback?: (chart: Chart) => void;
  className?: string;
  containerProps?: Record<string, unknown>;
  children?: ReactNode;
  [x: string]: unknown; // TODO: this is here to allow eventhandlers like onLegendItemClick
} & Partial<Options>;

const HighchartsChart = (props: HighchartsChartProps) => {
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
