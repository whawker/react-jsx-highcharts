import PlotBand from './PlotBand';
import PlotLine from './PlotLine';
import PlotBandLineLabel from './PlotBandLineLabel';
import provideAxis from '../AxisProvider';

const ChartPlotBand = provideAxis(PlotBand);
ChartPlotBand.Label = PlotBandLineLabel;
const ChartPlotLine = provideAxis(PlotLine);
ChartPlotLine.Label = PlotBandLineLabel;

export {ChartPlotLine as PlotLine };
export {ChartPlotBand as PlotBand };

