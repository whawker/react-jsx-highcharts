import Axis from './Axis';
import AxisTitle from './AxisTitle';
import provideAxis from '../AxisProvider';
const ChartAxis = provideAxis(Axis);
ChartAxis.Title = provideAxis(AxisTitle);
export default ChartAxis;
