import { useContext } from 'react';
import ChartContext from '../ChartContext';

import type { ChartContextValue } from '../ChartContext';
export type { ChartContextValue };

export default function useChart(): ChartContextValue {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <HighchartsChart>');
  }
  return context;
}
