import { useContext } from 'react';
import ChartContext from '../ChartContext';

export default function useChart() {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart must be used within a <HighchartsChart>');
  }
  return context;
}
