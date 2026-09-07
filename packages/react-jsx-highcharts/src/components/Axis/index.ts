import Axis from './Axis.tsx';
import AxisTitle from './AxisTitle.tsx';

const ChartAxis = Axis as typeof Axis & {
  Title: typeof AxisTitle;
};

ChartAxis.Title = AxisTitle;
export default ChartAxis;
