import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { CaptionOptions } from 'highcharts';

type CaptionProps = {
  children?: string;
} & Partial<Omit<CaptionOptions, 'text'>>;

const Caption = memo((props: CaptionProps) => {
  useChartUpdate(props, updateCaption, chart =>
    updateCaption(chart, { text: null })
  );

  return null;
});

// @ts-expect-error TODO
const updateCaption = (chart, config) => {
  chart.setCaption(config);
};

Caption.displayName = 'Caption';

export default Caption;
