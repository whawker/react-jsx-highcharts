import MapNavigation from './MapNavigation';
import MapNavigationZoomIn from './MapNavigationZoomIn';
import MapNavigationZoomOut from './MapNavigationZoomOut';
const ChartMapNavigation = MapNavigation;
ChartMapNavigation.ZoomIn = MapNavigationZoomIn;
ChartMapNavigation.ZoomOut = MapNavigationZoomOut;
export default ChartMapNavigation;
