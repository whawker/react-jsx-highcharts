import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { ReactNode } from 'react';
import type { TitleOptions } from 'highcharts';

type TitleProps = {
  children?: ReactNode;
} & Partial<Omit<TitleOptions, 'text'>>;

const Title = memo((props: TitleProps) => {
  useChartUpdate(props, updateTitle, chart =>
    updateTitle(chart, { text: null })
  );

  return null;
});

// @ts-expect-error TODO
const updateTitle = (chart, config) => {
  chart.setTitle(config, null, false);
};

Title.displayName = 'Title';

export default Title;
