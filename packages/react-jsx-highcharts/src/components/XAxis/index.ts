import XAxis from './XAxis.tsx';
import Axis from '../Axis/index.ts';

const ChartXAxis = XAxis as typeof XAxis & {
  Title: typeof Axis.Title;
};

ChartXAxis.Title = Axis.Title;
export default ChartXAxis;
