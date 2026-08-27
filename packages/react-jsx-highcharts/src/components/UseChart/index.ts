import { useContext } from 'react';
import ChartContext from '../ChartContext';

export default function useChart() {
  return useContext(ChartContext);
}
