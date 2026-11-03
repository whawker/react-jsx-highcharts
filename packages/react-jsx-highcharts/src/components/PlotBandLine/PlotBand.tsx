import { memo } from 'react';
import { PlotBandContext } from '../PlotBandLineContext/index.ts';
import usePlotBandLineLifecycle from './UsePlotBandLineLifecycle.ts';

import type { ReactNode } from 'react';
import type { AxisPlotBandsOptions } from 'highcharts';

export type PlotBandProps = {
  children?: ReactNode;
} & Partial<AxisPlotBandsOptions>;

const PlotBand = memo((props: PlotBandProps) => {
  const plotband = usePlotBandLineLifecycle(props, 'plotBands');

  const { children } = props;

  if (!children && !plotband) return null;

  return (
    <PlotBandContext.Provider value={plotband}>
      {children}
    </PlotBandContext.Provider>
  );
});

PlotBand.displayName = 'PlotBand';
export default PlotBand;
