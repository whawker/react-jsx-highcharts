import PlotBand from './PlotBand.tsx';
import PlotLine from './PlotLine.tsx';
import PlotBandLineLabel from './PlotBandLineLabel.tsx';

import type {
  PlotLineLabelProps,
  PlotBandLabelProps
} from './PlotBandLineLabel.tsx';

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
