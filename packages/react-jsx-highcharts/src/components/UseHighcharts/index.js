import { useContext } from 'react';
import HighchartsContext from '../HighchartsContext';

export default function useHighcharts() {
  const getHighcharts = useContext(HighchartsContext);

  return getHighcharts;
}
