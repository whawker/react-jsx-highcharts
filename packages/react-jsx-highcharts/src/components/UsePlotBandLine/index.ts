import { useContext } from 'react';
import PlotLineContext from '../PlotBandLineContext/index.ts';

import type { PlotBandLineContextValue } from '../PlotBandLineContext/index.ts';

export default function usePlotBandLine(): PlotBandLineContextValue | null {
  return useContext(PlotLineContext);
}
