import { useContext, useState, useRef, useDebugValue } from 'react';
import AxisContext from '../AxisContext';
import useChart from '../UseChart';
import createProvidedAxis from '../Axis/createProvidedAxis';
import useDelayOnce from '../UseDelayOnce';

export default function useAxis(axisId) {
  const chart = useChart();
  const contextAxis = useContext(AxisContext);
  const [, setDelayPassed] = useState(false);

  const createOrUpdateAxis = prevAxis => {
    if (contextAxis) return contextAxis;

    if (axisId) {
      const axis = chart.get(axisId);
      // navigator axis gets new instance when updated
      if (prevAxis) {
        if (axis !== prevAxis.object) {
          return createProvidedAxis(axis);
        }
        return prevAxis;
      } else {
        return createProvidedAxis(axis);
      }
    }
    return null;
  };

  const providedAxisRef = useRef(null);

  providedAxisRef.current = createOrUpdateAxis(providedAxisRef.current);

  useDelayOnce(() => {
    if (providedAxisRef.current) return; // we already had axis
    // set state to try again
    setDelayPassed(true);
  });

  useDebugValue(providedAxisRef.current ? providedAxisRef.current.id : null);

  return providedAxisRef.current;
}
