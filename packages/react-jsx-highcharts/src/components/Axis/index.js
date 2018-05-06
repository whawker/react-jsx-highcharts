import Axis from './Axis';
import AxisTitle from './AxisTitle';
import provideChart from '../ChartProvider/index2';
import provideAxis from '../AxisProvider/index2';
const ChartAxis = provideChart(Axis);
ChartAxis.Title = provideAxis(AxisTitle);
export default ChartAxis;
