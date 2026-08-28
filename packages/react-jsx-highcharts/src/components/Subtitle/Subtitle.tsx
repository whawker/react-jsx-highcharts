import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { SubtitleOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';

type SubtitleProps = {
  children?: ReactNode;
} & Partial<Omit<SubtitleOptions, 'text'>>;

const Subtitle = memo((props: SubtitleProps) => {
  useChartUpdate(props, updateSubtitle, chart =>
    // @ts-expect-error text does not want to be null
    updateSubtitle(chart, { text: null })
  );

  return null;
});

const updateSubtitle = (
  chart: ChartContextValue,
  config: Partial<SubtitleOptions>
) => {
  chart.setTitle(undefined, config, false);
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
