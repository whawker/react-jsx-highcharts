import { createContext } from 'react';

import type { Axis } from 'highcharts';

export type ColorAxisContextValue = {
  object: Axis;
  id?: string;
};

const ColorAxisContext = createContext<ColorAxisContextValue | null>(null);
ColorAxisContext.displayName = 'ColorAxisContext';

export default ColorAxisContext;
