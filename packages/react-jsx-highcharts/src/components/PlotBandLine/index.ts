import PlotBand from './PlotBand';
import PlotLine from './PlotLine';

import PlotBandLineLabel from './PlotBandLineLabel';
import type {
  PlotLineLabelProps,
  PlotBandLabelProps
} from './PlotBandLineLabel';

const ChartPlotBand = PlotBand as typeof PlotBand & {
  Label: React.ComponentType<PlotBandLabelProps>;
};
ChartPlotBand.Label = PlotBandLineLabel;

const ChartPlotLine = PlotLine as typeof PlotLine & {
  Label: React.ComponentType<PlotLineLabelProps>;
};
ChartPlotLine.Label = PlotBandLineLabel;

export { ChartPlotLine as PlotLine };
export { ChartPlotBand as PlotBand };
