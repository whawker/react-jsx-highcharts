import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';

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

// @ts-expect-error TODO
const updateLegend = (chart, config) => {
  chart.update({ legend: config }, false);
};

Legend.displayName = 'Legend';

export default Legend;
