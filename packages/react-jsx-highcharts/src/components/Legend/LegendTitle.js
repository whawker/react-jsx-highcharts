import { memo } from 'react';
import useChartUpdate from '../UseChartUpdate';

const LegendTitle = memo(props => {
  useChartUpdate(props, updateLegendTitle, chart =>
    updateLegendTitle(chart, { text: null })
  );

  return null;
});

const updateLegendTitle = (chart, config) => {
  chart.update(
    {
      legend: {
        title: config
      }
    },
    false
  );
};

LegendTitle.displayName = 'LegendTitle';

export default LegendTitle;
