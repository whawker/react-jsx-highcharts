import { useContext } from 'react';
import HighchartsContext from '../HighchartsContext';

export default function useHighcharts() {
  const Highcharts = useContext(HighchartsContext);

  return Highcharts;
}
