import { useContext, useState, useEffect, useDebugValue } from 'react';
import ColorAxisContext from '../ColorAxisContext/index.ts';
import useChart from '../UseChart/index.ts';
import createProvidedColorAxis from '../ColorAxis/createProvidedColorAxis.ts';

import type { Axis } from 'highcharts';
import type { ColorAxisContextValue } from '../ColorAxisContext/index.ts';

export default function useColorAxis(
  colorAxisId?: string
): ColorAxisContextValue | null {
  const chart = useChart();
  const contextColorAxis = useContext(ColorAxisContext);

  const createStateColorAxis = () => {
    if (contextColorAxis) return contextColorAxis;

    if (colorAxisId) {
      const colorAxis = chart.get(colorAxisId) as Axis;
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
