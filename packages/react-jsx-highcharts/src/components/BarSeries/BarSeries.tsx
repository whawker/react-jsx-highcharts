import { useEffect } from 'react';
import Series from '../Series/index.ts';
import useChart from '../UseChart/index.ts';

import type { SeriesProps } from '../Series/Series.tsx';
import type { SeriesBarOptions } from 'highcharts';

type BarSeriesProps = SeriesProps<SeriesBarOptions>;

const BarSeries = (props: BarSeriesProps) => {
  const chart = useChart();

  useEffect(() => {
    chart.update({ chart: { inverted: true } });
  }, []);

  return <Series {...props} type="bar" />;
};

export default BarSeries;
