import { useContext } from 'react';
import {
  PlotBandContext,
  PlotLineContext
} from '../PlotBandLineContext/index.ts';

import type {
  PlotBandContextValue,
  PlotLineContextValue
} from '../PlotBandLineContext/index.ts';

export function usePlotBand(): PlotBandContextValue | null {
  return useContext(PlotBandContext);
}

export function usePlotLine(): PlotLineContextValue | null {
  return useContext(PlotLineContext);
}
