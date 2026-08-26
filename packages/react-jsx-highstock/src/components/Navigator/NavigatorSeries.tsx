import { useEffect } from 'react';
import { useSeries } from 'react-jsx-highcharts';

const NavigatorSeries = props => {
  const series = useSeries(props.seriesId);

  useEffect(() => {
    if (!series) return;

    updateNavigatorSeries(series, { showInNavigator: true });
    return () => {
      try {
        updateNavigatorSeries(series, { showInNavigator: false });
      } catch {
        // ignore as series might have been already unmounted
      }
    };
  }, [series]);

  return null;
};

const updateNavigatorSeries = (series, config) => {
  series.update(config);
};

export default NavigatorSeries;
