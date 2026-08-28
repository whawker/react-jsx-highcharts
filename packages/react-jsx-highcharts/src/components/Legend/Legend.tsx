import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { ChartContextValue } from '../ChartContext';

type LegendProps = {
  children?: ReactNode;
} & Partial<Highcharts.LegendOptions>;

const Legend = memo(
  ({ children = null, enabled = true, ...restProps }: LegendProps) => {
    useChartUpdate(
      { enabled, ...restProps },
      updateLegend,
      chart => updateLegend(chart, { enabled: false }),
      false
    );

    return children;
  }
);

const updateLegend = (
  chart: ChartContextValue,
  config: Partial<Highcharts.LegendOptions>
) => {
  chart.update({ legend: config }, false);
};

Legend.displayName = 'Legend';

export default Legend;
