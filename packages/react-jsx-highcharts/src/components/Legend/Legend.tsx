import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { LegendOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';

type LegendProps = {
  children?: ReactNode;
} & Partial<LegendOptions>;

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
  config: Partial<LegendOptions>
) => {
  chart.update({ legend: config }, false);
};

Legend.displayName = 'Legend';

export default Legend;
