import { useEffect } from 'react';
import { attempt } from 'lodash-es';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';

const noop = c => c;

const useChartUpdate = (
  props,
  updateFn = noop,
  destroyFn = noop,
  childrenIsText = true
) => {
  const chart = useChart();
  const modifiedProps = useModifiedProps(props, childrenIsText);

  useEffect(() => {
    if (modifiedProps !== false) {
      updateFn(chart, modifiedProps);
      chart.needsRedraw();
    }
  });

  useEffect(() => {
    return () => {
      attempt(destroyFn, chart);
      chart.needsRedraw();
    };
  }, []);
};

export default useChartUpdate;
