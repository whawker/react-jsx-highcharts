import Axis from './Axis';
import AxisTitle from './AxisTitle';
import provideChart from '../ChartProvider';
import provideAxis from '../AxisProvider';
const ChartAxis = provideChart(Axis);
ChartAxis.Title = provideAxis(AxisTitle);
export default ChartAxis;
