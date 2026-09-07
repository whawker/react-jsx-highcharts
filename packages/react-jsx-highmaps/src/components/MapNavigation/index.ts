import MapNavigation from './MapNavigation.tsx';
import MapNavigationZoomIn from './MapNavigationZoomIn.tsx';
import MapNavigationZoomOut from './MapNavigationZoomOut.tsx';

const ChartMapNavigation = MapNavigation as typeof MapNavigation & {
  ZoomIn: typeof MapNavigationZoomIn;
  ZoomOut: typeof MapNavigationZoomOut;
};

ChartMapNavigation.ZoomIn = MapNavigationZoomIn;
ChartMapNavigation.ZoomOut = MapNavigationZoomOut;
export default ChartMapNavigation;
