import { createContext } from 'react';

import type {
  Axis,
  AxisPlotBandsOptions,
  AxisPlotLinesOptions,
  PlotLineOrBand
} from 'highcharts';

export type AxisContextValue = {
  object: Axis;
  type: string;
  id: string;
  update: Axis['update'];
  remove: Axis['remove'];
  addPlotLine: (options: AxisPlotLinesOptions) => PlotLineOrBand;
  removePlotLine: (id: string) => void;
  addPlotBand: (options: AxisPlotBandsOptions) => PlotLineOrBand;
  removePlotBand: (id: string) => void;
  getExtremes: Axis['getExtremes'];
  setExtremes: Axis['setExtremes'];
  setTitle: Axis['setTitle'];
};

const AxisContext = createContext<AxisContextValue | null>(null);
AxisContext.displayName = 'AxisContext';

export default AxisContext;
