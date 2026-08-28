import XAxis from './XAxis';
import Axis from '../Axis';

const ChartXAxis = XAxis as typeof XAxis & {
  Title: typeof Axis.Title;
};
ChartXAxis.Title = Axis.Title;
export default ChartXAxis;
