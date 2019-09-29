import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';
const Caption = memo(props => {
  useChartUpdate(props, updateCaption, chart =>
    updateCaption(chart, { text: null })
  );

  return null;
});

const updateCaption = (chart, config) => {
  chart.setCaption(config);
};

Caption.displayName = 'Caption';

export default Caption;
