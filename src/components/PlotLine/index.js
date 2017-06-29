import PlotLine from './PlotLine';
import PlotLineLabel from './PlotLineLabel';
import provideAxis from '../AxisProvider';
const ChartPlotLine = provideAxis(PlotLine);
ChartPlotLine.Label = provideAxis(PlotLineLabel);
export default ChartPlotLine;
