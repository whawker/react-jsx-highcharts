import { memo } from 'react';
import PlotBandLineContext from '../PlotBandLineContext/index.ts';
import usePlotBandLineLifecycle from './UsePlotBandLineLifecycle.ts';

import type { ReactNode } from 'react';
import type { AxisPlotLinesOptions } from 'highcharts';

type PlotLineProps = {
  children?: ReactNode;
} & Partial<AxisPlotLinesOptions>;

const PlotLine = memo((props: PlotLineProps) => {
  const plotline = usePlotBandLineLifecycle(props, 'plotLines');

  const { children } = props;

  if (!children && !plotline) return null;

  return (
    <PlotBandLineContext.Provider value={plotline}>
      {children}
    </PlotBandLineContext.Provider>
  );
});

PlotLine.displayName = 'PlotLine';
export default PlotLine;
