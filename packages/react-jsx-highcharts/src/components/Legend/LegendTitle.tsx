import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { LegendTitleOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';

type LegendTitleProps = {
  children?: ReactNode;
} & Partial<Omit<LegendTitleOptions, 'text'>>;

const LegendTitle = memo((props: LegendTitleProps) => {
  useChartUpdate(props, updateLegendTitle, chart =>
    // @ts-expect-error setting legend title text to null
    updateLegendTitle(chart, { text: null })
  );

  return null;
});

const updateLegendTitle = (
  chart: ChartContextValue,
  config: Partial<LegendTitleOptions>
) => {
  chart.update(
    {
      legend: {
        title: config
      }
    },
    false
  );
};

LegendTitle.displayName = 'LegendTitle';

export default LegendTitle;
