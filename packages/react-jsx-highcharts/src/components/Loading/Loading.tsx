import { useEffect, memo } from 'react';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';

type LoadingProps = {
  children?: string;
  isLoading?: boolean;
} & Partial<Omit<Highcharts.LoadingOptions, 'text'>>;

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

// @ts-expect-error TODO
const updateLoading = (config, chart) => {
  chart.update({ loading: config }, true);
};

Loading.displayName = 'Loading';
export default Loading;
