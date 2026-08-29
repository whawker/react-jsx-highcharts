import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { CaptionOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';
type CaptionProps = {
  children?: string;
} & Partial<Omit<CaptionOptions, 'text'>>;

const Caption = memo((props: CaptionProps) => {
  useChartUpdate(props, updateCaption, chart =>
    // @ts-expect-error setting caption text to null
    updateCaption(chart, { text: null })
  );

  return null;
});

const updateCaption = (
  chart: ChartContextValue,
  config: Partial<CaptionOptions>
) => {
  chart.setCaption(config);
};

Caption.displayName = 'Caption';

export default Caption;
