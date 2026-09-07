import { useEffect } from 'react';
import useChart from '../UseChart';
import useModifiedProps from '../UseModifiedProps';

import type { ChartContextValue } from '../UseChart';

const noop = (_chart: ChartContextValue, _props?: unknown) => undefined;

const useChartUpdate = <
  P extends Record<string, unknown> & { children?: React.ReactNode }
>(
  props: P,
  updateFn: (chart: ChartContextValue, props: Partial<P>) => void = noop,
  destroyFn: (chart: ChartContextValue) => void = noop,
  childrenIsText: boolean = true
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
