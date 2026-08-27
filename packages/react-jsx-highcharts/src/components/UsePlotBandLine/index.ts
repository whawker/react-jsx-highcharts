import { useContext } from 'react';
import PlotLineContext from '../PlotBandLineContext';

export default function usePlotBandLine() {
  return useContext(PlotLineContext);
}
