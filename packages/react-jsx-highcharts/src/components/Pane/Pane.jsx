import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

const Pane = memo(({ children, ...restProps }) => {
  useChartUpdate(restProps, updatePane, chart => updatePane(chart, {}), false);

  return null;
});

const updatePane = (chart, config) => {
  chart.update({ pane: config }, false);
};
Pane.displayName = 'Pane';

export default Pane;
