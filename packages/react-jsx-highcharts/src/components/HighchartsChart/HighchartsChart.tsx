import BaseChart from '../BaseChart/index.ts';
import useHighcharts from '../UseHighcharts/index.ts';

import type { ReactNode } from 'react';

import type { Chart } from 'highcharts';
import type { Options } from 'highcharts';

export type HighchartsChartProps = {
  callback?: (chart: Chart) => unknown;
  className?: string;
  containerProps?: Record<string, unknown>;
  children?: ReactNode;
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
