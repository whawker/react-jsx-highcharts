import { useContext } from 'react';
import PlotLineContext from '../PlotBandLineContext';

import type { PlotBandLineContextValue } from '../PlotBandLineContext';

export default function usePlotBandLine(): PlotBandLineContextValue | null {
  return useContext(PlotLineContext);
}
