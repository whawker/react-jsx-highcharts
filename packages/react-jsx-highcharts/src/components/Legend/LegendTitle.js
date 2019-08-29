import { useEffect, useCallback, memo } from 'react';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';


const LegendTitle = memo(({ children = null, ...restProps}) => {

  const modifiedProps = useModifiedProps({ text: children, ...restProps});

  const { getChart, needsRedraw } = useChart();

  const updateLegendTitle = useCallback(config => {
    const chart = getChart();
    chart.update({
      legend: {
        title: config
      }
    }, false);
    needsRedraw();
  }, [getChart, needsRedraw]);

  // componentDidMount && componentDidUpdate
  useEffect(() => {
    if (modifiedProps !== false) {
      updateLegendTitle(modifiedProps);
    }
  },[modifiedProps, updateLegendTitle]);

  useEffect(() => {
    // componentWillUnmount
    return () => attempt(updateLegendTitle, { text: null });
  },[updateLegendTitle]);

  return children;
})

LegendTitle.displayName = 'LegendTitle';

export default LegendTitle;

