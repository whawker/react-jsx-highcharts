import { useContext, useState } from 'react';
import AxisContext from '../AxisContext';
import useChart from '../UseChart';
import createGetAxis from './createGetAxis';
import useDelay from '../UseDelay';

export default function useAxis(axisId) {

  const chart = useChart();
  const providedAxis = useContext(AxisContext);

  const createStateAxis = () => {
    if(providedAxis) return createGetAxis(providedAxis);

    if (axisId) {
      const axis = chart.get(axisId);
      return createGetAxis(axis);
    }
    return null;
  }

  const [getAxis, setGetAxis] = useState(createStateAxis);

  useDelay(()=> {
    if(getAxis) return; // we already had axis
    // axis should now be created
    setGetAxis(createStateAxis());
  })

  return getAxis;
}


