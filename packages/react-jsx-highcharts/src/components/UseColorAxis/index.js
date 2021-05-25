import { useContext, useState, useEffect, useDebugValue } from 'react';
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

  const [providedColorAxis, setProvidedColorAxis] =
    useState(createStateColorAxis);

  useEffect(() => {
    if (providedColorAxis) return; // we already had axis
    // axis should now be created
    setProvidedColorAxis(createStateColorAxis());
  }, []);

  useDebugValue(providedColorAxis ? providedColorAxis.id : null);

  return providedColorAxis;
}
