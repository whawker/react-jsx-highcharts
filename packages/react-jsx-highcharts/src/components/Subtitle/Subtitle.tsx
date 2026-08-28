import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { SubtitleOptions } from 'highcharts';

type SubtitleProps = {
  children?: ReactNode;
} & Partial<Omit<SubtitleOptions, 'text'>>;

const Subtitle = memo((props: SubtitleProps) => {
  useChartUpdate(props, updateSubtitle, chart =>
    updateSubtitle(chart, { text: null })
  );

  return null;
});

// @ts-expect-error TODO
const updateSubtitle = (chart, config) => {
  chart.setTitle(undefined, config, false);
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
