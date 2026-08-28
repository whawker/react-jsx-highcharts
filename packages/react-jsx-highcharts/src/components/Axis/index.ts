import Axis from './Axis';
import AxisTitle from './AxisTitle';

const ChartAxis = Axis as typeof Axis & {
  Title: typeof AxisTitle;
};
ChartAxis.Title = AxisTitle;
export default ChartAxis;
