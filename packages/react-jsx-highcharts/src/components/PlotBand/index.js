import PlotBand from './PlotBand';
import PlotBandLabel from './PlotBandLabel';
import provideAxis from '../AxisProvider/index2';
const ChartPlotBand = provideAxis(PlotBand);
ChartPlotBand.Label = provideAxis(PlotBandLabel);
export default ChartPlotBand;
