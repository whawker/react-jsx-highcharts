import Navigator from './Navigator';
import NavigatorSeries from './NavigatorSeries';
import provideChart from 'react-jsx-highcharts/src/components/ChartProvider';
import provideSeries from 'react-jsx-highcharts/src/components/SeriesProvider';
const ChartNavigator = provideChart(Navigator);
ChartNavigator.Series = provideSeries(NavigatorSeries);
export default ChartNavigator;
