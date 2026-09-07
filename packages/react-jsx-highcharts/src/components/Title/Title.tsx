import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { TitleOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';

type TitleProps = {
  children?: ReactNode;
} & Partial<Omit<TitleOptions, 'text'>>;

const Title = memo((props: TitleProps) => {
  useChartUpdate(props, updateTitle, chart =>
    // @ts-expect-error setting title text to null
    updateTitle(chart, { text: null })
  );

  return null;
});

const updateTitle = (
  chart: ChartContextValue,
  config: Partial<TitleOptions>
) => {
  // @ts-expect-error setting title subtitleoptions to null
  chart.setTitle(config, null, false);
};

Title.displayName = 'Title';

export default Title;
