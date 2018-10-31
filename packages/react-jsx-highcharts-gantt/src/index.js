import { withSeriesType } from 'react-jsx-highcharts';

// TODO: Add more common modules that Highcarts Gantt support
export {
  Chart,
  Title,
  Subtitle,
  Tooltip,
} from 'react-jsx-highcharts';


// Charts
export { default as HighchartsGanttChart } from './components/HighchartsGanttChart';

// Graph Parts

export { default as XAxis } from './components/XAxis';
export { default as YAxis } from './components/YAxis';

export { default as Pathfinder } from './components/Pathfinder';

// Series
export const GanttSeries = withSeriesType('gantt');
