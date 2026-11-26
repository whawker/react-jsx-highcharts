import BaseChart from '../BaseChart/index.ts';
import useHighcharts from '../UseHighcharts/index.ts';

import type { BaseChartProps } from '../BaseChart/BaseChart.ts';

export type HighchartsChartProps = Omit<
  BaseChartProps,
  'chartCreationFunc' | 'chartType'
>;

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
