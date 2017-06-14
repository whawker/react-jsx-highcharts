import Navigator from './Navigator';
import NavigatorSeries from './NavigatorSeries';
import provideChart from '../ChartProvider';
import provideSeries from '../SeriesProvider';
const ChartNavigator = provideChart(Navigator);
ChartNavigator.Series = provideSeries(NavigatorSeries);
export default ChartNavigator;
