import { withSeriesType } from 'react-jsx-highcharts';
export {
  Chart,
  ColorAxis,
  Credits,
  Debug,
  HighchartsProvider as HighmapsProvider,
  Loading,
  Legend,
  Series,
  Subtitle,
  Title,
  Tooltip,
  useHighcharts,
  useChart,
  useAxis,
  useSeries,
  withHighcharts as withHighmaps,
  withSeriesType
} from 'react-jsx-highcharts';

import type {
  SeriesMapbubbleOptions,
  SeriesMaplineOptions,
  SeriesMappointOptions,
  SeriesMapOptions
} from 'highcharts';

// Charts
export { default as HighchartsMapChart } from './components/HighchartsMapChart/index.ts';

// Graph Parts
export { default as MapNavigation } from './components/MapNavigation/index.ts';
export { default as XAxis } from './components/XAxis/index.ts';
export { default as YAxis } from './components/YAxis/index.ts';

// Series
const parentAxisId = { axisId: 'yAxis' };
export const MapBubbleSeries = withSeriesType<SeriesMapbubbleOptions>(
  'MapBubble',
  parentAxisId
);
export const MapLineSeries = withSeriesType<SeriesMaplineOptions>(
  'MapLine',
  parentAxisId
);
export const MapPointSeries = withSeriesType<SeriesMappointOptions>(
  'MapPoint',
  parentAxisId
);
export const MapSeries = withSeriesType<SeriesMapOptions>('Map', parentAxisId);
