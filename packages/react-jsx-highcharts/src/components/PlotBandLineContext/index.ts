import { createContext } from 'react';
import type { PlotLineOrBand } from 'highcharts';

export type PlotLineContextValue = {
  id: string;
  object?: PlotLineOrBand;
};

export type PlotBandContextValue = {
  id: string;
  object?: PlotLineOrBand;
};

const PlotBandContext = createContext<PlotBandContextValue | null>(null);

const PlotLineContext = createContext<PlotLineContextValue | null>(null);

PlotBandContext.displayName = 'PlotBandContext';
PlotLineContext.displayName = 'PlotLineContext';

export { PlotBandContext, PlotLineContext };
