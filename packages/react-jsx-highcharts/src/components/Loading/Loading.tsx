import { useEffect, memo } from 'react';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';

import type { LoadingOptions } from 'highcharts';
import type { ChartContextValue } from '../ChartContext';

type LoadingProps = {
  children?: string;
  isLoading?: boolean;
} & Partial<Omit<LoadingOptions, 'text'>>;

const Loading = memo(
  ({ children, isLoading = true, ...restProps }: LoadingProps) => {
    const chart = useChart();
    const modifiedProps = useModifiedProps(restProps);

    useEffect(() => {
      if (modifiedProps !== false) {
        updateLoading(modifiedProps, chart);
      }
      if (isLoading) {
        chart.showLoading(children);
      } else {
        chart.hideLoading();
      }
    });

    useEffect(() => {
      return () => {
        try {
          chart.hideLoading();
        } catch {
          // ignore as chart might have been unmounted
        }
      };
    }, []);

    return null;
  }
);

const updateLoading = (
  config: Partial<LoadingOptions>,
  chart: ChartContextValue
) => {
  chart.update({ loading: config }, true);
};

Loading.displayName = 'Loading';
export default Loading;
