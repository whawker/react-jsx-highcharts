import XAxis from './XAxis';
import provideChart from '../ChartProvider';
import Axis from '../Axis';
const ChartXAxis = provideChart(XAxis);
ChartXAxis.Title = Axis.Title;
export default ChartXAxis;
