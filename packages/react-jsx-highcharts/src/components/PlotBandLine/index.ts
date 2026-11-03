import PlotBand from './PlotBand.tsx';
import PlotLine from './PlotLine.tsx';
import { PlotBandLabel, PlotLineLabel } from './PlotBandLineLabel.tsx';

import type {
  PlotLineLabelProps,
  PlotBandLabelProps
} from './PlotBandLineLabel.tsx';

const ChartPlotBand = PlotBand as typeof PlotBand & {
  Label: React.ComponentType<PlotBandLabelProps>;
};
ChartPlotBand.Label = PlotBandLabel;

const ChartPlotLine = PlotLine as typeof PlotLine & {
  Label: React.ComponentType<PlotLineLabelProps>;
};
ChartPlotLine.Label = PlotLineLabel;

export { ChartPlotLine as PlotLine };
export { ChartPlotBand as PlotBand };
