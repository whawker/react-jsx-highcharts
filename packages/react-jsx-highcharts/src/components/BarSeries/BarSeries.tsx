import * as React from 'react';
import { useEffect } from 'react';
import Series from '../Series';
import useChart from '../UseChart';

import type { SeriesProps } from '../Series/Series';
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
