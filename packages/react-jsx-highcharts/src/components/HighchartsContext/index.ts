import { createContext } from 'react';

import type Highcharts from 'highcharts';

type HighchartsContextValue = typeof Highcharts;

const HighchartsContext = createContext<HighchartsContextValue | undefined>(
  undefined
);

HighchartsContext.displayName = 'HighchartsContext';
export default HighchartsContext;
