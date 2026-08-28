import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';

type LegendTitleProps = {
  children?: ReactNode;
} & Partial<Omit<Highcharts.LegendTitleOptions, 'text'>>;

const LegendTitle = memo((props: LegendTitleProps) => {
  useChartUpdate(props, updateLegendTitle, chart =>
    updateLegendTitle(chart, { text: null })
  );

  return null;
});

// @ts-expect-error TODO
const updateLegendTitle = (chart, config) => {
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
