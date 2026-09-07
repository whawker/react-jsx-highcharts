import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

import type { PaneOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';

type PaneProps = Partial<PaneOptions>;
// @ts-expect-error TODO
const Pane = memo(({ children, ...restProps }: PaneProps) => {
  useChartUpdate(restProps, updatePane, chart => updatePane(chart, {}), false);

  return null;
});

const updatePane = (chart: ChartContextValue, config: Partial<PaneOptions>) => {
  chart.update({ pane: config }, false);
};
Pane.displayName = 'Pane';

export default Pane;
