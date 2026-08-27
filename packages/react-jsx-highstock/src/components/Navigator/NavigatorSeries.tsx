import { useEffect } from 'react';
import { useSeries } from 'react-jsx-highcharts';

type NavigatorSeriesProps = {
  seriesId: string;
};

const NavigatorSeries = (props: NavigatorSeriesProps) => {
  const series = useSeries(props.seriesId);

  useEffect(() => {
    if (!series) return;
    // @ts-expect-error showInNavigator only available in Highstock
    series.update({ showInNavigator: true });
    return () => {
      try {
        // @ts-expect-error showInNavigator only available in Highstock
        series.update({ showInNavigator: false });
      } catch {
        // ignore as series might have been already unmounted
      }
    };
  }, [series]);

  return null;
};

export default NavigatorSeries;
