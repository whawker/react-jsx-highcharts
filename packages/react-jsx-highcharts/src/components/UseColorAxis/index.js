import { useContext, useRef, useDebugValue } from 'react';
import ColorAxisContext from '../ColorAxisContext';
import useChart from '../UseChart';
import createProvidedColorAxis from '../ColorAxis/createProvidedColorAxis';

export default function useColorAxis(colorAxisId) {
  const chart = useChart();
  const contextColorAxis = useContext(ColorAxisContext);

  const createStateColorAxis = () => {
    if (contextColorAxis) return contextColorAxis;

    if (colorAxisId) {
      const colorAxis = chart.get(colorAxisId);
      return createProvidedColorAxis(colorAxis);
    }
    return null;
  };

  const providedColorAxisRef = useRef(createStateColorAxis());

  useDebugValue(
    providedColorAxisRef.current ? providedColorAxisRef.current.id : null
  );

  return providedColorAxisRef.current;
}
