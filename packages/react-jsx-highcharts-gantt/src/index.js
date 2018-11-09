import { withSeriesType } from 'react-jsx-highcharts';

// TODO: Add more common modules that Highcarts Gantt support
export {
  Chart,
  Title,
  Subtitle,
  Tooltip,
  withHighcharts
} from 'react-jsx-highcharts';


// Charts
export { default as HighchartsGanttChart } from './components/HighchartsGanttChart';

// Graph Parts

export { default as XAxis } from './components/XAxis';
export { default as YAxis } from './components/YAxis';

export { default as Pathfinder } from './components/Pathfinder';

// Series
const parentAxisId = { axisId: 'yAxis' };
export const GanttSeries = withSeriesType('gantt', parentAxisId);
export const XRangeSeries = withSeriesType('xrange', parentAxisId);
