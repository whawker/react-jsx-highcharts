import Navigator from './Navigator';
import NavigatorSeries from './NavigatorSeries';
import NavigatorXAxis from './NavigatorXAxis';
import NavigatorYAxis from './NavigatorYAxis';
const ChartNavigator = Navigator;
ChartNavigator.Series = NavigatorSeries;
ChartNavigator.XAxis = NavigatorXAxis;
ChartNavigator.YAxis = NavigatorYAxis;
export default ChartNavigator;
