import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

const Title = memo(props => {
  useChartUpdate(props, updateTitle, chart =>
    updateTitle(chart, { text: null })
  );

  return null;
});

const updateTitle = (chart, config) => {
  chart.setTitle(config, null, false);
};

Title.displayName = 'Title';

export default Title;
