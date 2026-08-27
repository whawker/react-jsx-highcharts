import PlotBand from './PlotBand';
import PlotLine from './PlotLine';
import PlotBandLineLabel from './PlotBandLineLabel';

const ChartPlotBand = PlotBand;
ChartPlotBand.Label = PlotBandLineLabel;
const ChartPlotLine = PlotLine;
ChartPlotLine.Label = PlotBandLineLabel;

export { ChartPlotLine as PlotLine };
export { ChartPlotBand as PlotBand };
