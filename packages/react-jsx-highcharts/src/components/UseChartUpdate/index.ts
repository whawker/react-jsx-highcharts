import { useEffect } from 'react';
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
      try {
        destroyFn(chart);
      } catch {
        // ignore as chart might have been already unmounted
      }
      chart.needsRedraw();
    };
  }, []);
};

export default useChartUpdate;
