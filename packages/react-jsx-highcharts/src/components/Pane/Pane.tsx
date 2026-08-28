import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { PaneOptions } from 'highcharts';

type PaneProps = Partial<PaneOptions>;
// @ts-expect-error TODO
const Pane = memo(({ children, ...restProps }: PaneProps) => {
  useChartUpdate(restProps, updatePane, chart => updatePane(chart, {}), false);

  return null;
});

// @ts-expect-error TODO
const updatePane = (chart, config) => {
  chart.update({ pane: config }, false);
};
Pane.displayName = 'Pane';

export default Pane;
