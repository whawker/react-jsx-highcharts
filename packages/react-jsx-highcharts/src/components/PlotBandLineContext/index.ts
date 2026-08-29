import { createContext } from 'react';
import type { PlotLineOrBand } from 'highcharts';

export type PlotBandLineContextValue = {
  id: string;
  object?: PlotLineOrBand;
};

const PlotBandLineContext = createContext<PlotBandLineContextValue | null>(
  null
);

PlotBandLineContext.displayName = 'PlotBandLineContext';

export default PlotBandLineContext;
