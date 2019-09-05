import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

const Subtitle = memo(props => {
  useChartUpdate(props, updateSubtitle, chart =>
    updateSubtitle(chart, { text: null })
  );

  return null;
});

const updateSubtitle = (chart, config) => {
  chart.setTitle(undefined, config, false);
};

Subtitle.displayName = 'Subtitle';

export default Subtitle;
