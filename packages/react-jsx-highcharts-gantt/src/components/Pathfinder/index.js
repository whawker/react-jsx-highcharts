import Pathfinder from './Pathfinder';
import { provideChart } from 'react-jsx-highcharts';
import Marker from "./Marker";
const ChartPathfinder = provideChart(Pathfinder);
ChartPathfinder.Marker = provideChart(Marker);
export default ChartPathfinder;
