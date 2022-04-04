import * as React from 'react';
import { memo } from 'react';
import PlotBandLineContext from '../PlotBandLineContext';
import usePlotBandLineLifecycle from './UsePlotBandLineLifecycle';

const PlotBand = memo(props => {
  const plotband = usePlotBandLineLifecycle(props, 'plotBands');

  const { children } = props;

  if (!children && !plotband) return null;

  return (
    <PlotBandLineContext.Provider value={plotband}>
      {children}
    </PlotBandLineContext.Provider>
  );
});

PlotBand.displayName = 'PlotBand';
export default PlotBand;
