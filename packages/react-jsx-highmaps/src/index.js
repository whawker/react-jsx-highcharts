import { withSeriesType } from 'react-jsx-highcharts';
export {
  Chart,
  Credits,
  Debug,
  Loading,
  Legend,
  Series,
  Subtitle,
  Title,
  Tooltip,
  provideHighcharts,
  provideChart,
  provideAxis,
  provideSeries,
  withHighcharts as withHighmaps,
  withSeriesType
} from 'react-jsx-highcharts';

// Charts
export { default as HighchartsMapChart } from './components/HighchartsMapChart';

// Graph Parts
export { default as MapNavigation } from './components/MapNavigation';
export { default as XAxis } from './components/XAxis';
export { default as YAxis } from './components/YAxis';

// Series
const parentAxisId = { axisId: 'yAxis' };
export const MapBubbleSeries = withSeriesType('MapBubble', parentAxisId);
export const MapLineSeries = withSeriesType('MapLine', parentAxisId);
export const MapPointSeries = withSeriesType('MapPoint', parentAxisId);
export const MapSeries = withSeriesType('Map', parentAxisId);
