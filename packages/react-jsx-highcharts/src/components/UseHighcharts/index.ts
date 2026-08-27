import { useContext } from 'react';
import HighchartsContext from '../HighchartsContext';

export default function useHighcharts() {
  const context = useContext(HighchartsContext);
  if (!context) {
    throw new Error('useHighcharts must be used within a <HighchartsProvider>');
  }
  return context;
}
