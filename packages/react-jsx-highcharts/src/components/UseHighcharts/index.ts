import { useContext } from 'react';
import HighchartsContext from '../HighchartsContext';

export default function useHighcharts() {
  return useContext(HighchartsContext);
}
