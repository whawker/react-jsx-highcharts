import { useEffect, memo } from 'react';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';

const Loading = memo(({ children, isLoading = true, ...restProps }) => {
  const chart = useChart();
  const modifiedProps = useModifiedProps(restProps);

  useEffect(() => {
    if (modifiedProps !== false) {
      updateLoading(modifiedProps, chart);
    }
    isLoading ? chart.showLoading(children) : chart.hideLoading();
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
});

const updateLoading = (config, chart) => {
  chart.update({ loading: config }, true);
};

Loading.displayName = 'Loading';
export default Loading;
