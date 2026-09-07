import type { Axis } from 'highcharts';
import type { ColorAxisContextValue } from '../ColorAxisContext';

const createProvidedColorAxis = (colorAxis: Axis) => {
  if (!colorAxis) return null;

  const providedColorAxis: ColorAxisContextValue = {
    object: colorAxis,
    id: colorAxis.userOptions && colorAxis.userOptions.id
  };
  return providedColorAxis;
};

export default createProvidedColorAxis;
