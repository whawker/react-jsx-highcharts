import MapNavigation from './MapNavigation';
import MapNavigationZoomIn from './MapNavigationZoomIn';
import MapNavigationZoomOut from './MapNavigationZoomOut';
import { provideChart } from 'react-jsx-highcharts';
const ChartMapNavigation = provideChart(MapNavigation);
ChartMapNavigation.ZoomIn = MapNavigationZoomIn;
ChartMapNavigation.ZoomOut = MapNavigationZoomOut
export default ChartMapNavigation;
