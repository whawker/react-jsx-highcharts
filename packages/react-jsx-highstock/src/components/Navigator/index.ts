import Navigator from './Navigator.tsx';
import NavigatorSeries from './NavigatorSeries.tsx';
import NavigatorXAxis from './NavigatorXAxis.tsx';
import NavigatorYAxis from './NavigatorYAxis.tsx';

const ChartNavigator = Navigator as typeof Navigator & {
  Series: typeof NavigatorSeries;
  XAxis: typeof NavigatorXAxis;
  YAxis: typeof NavigatorYAxis;
};

ChartNavigator.Series = NavigatorSeries;
ChartNavigator.XAxis = NavigatorXAxis;
ChartNavigator.YAxis = NavigatorYAxis;
export default ChartNavigator;
