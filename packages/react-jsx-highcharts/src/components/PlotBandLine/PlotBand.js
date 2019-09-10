import React, { memo } from 'react';
import PropTypes from 'prop-types';
import PlotBandLineContext from './PlotBandLineContext';
import usePlotBandLine from './usePlotBandLine';


const PlotBand = memo(props => {
  const plotband = usePlotBandLine(props, 'plotBands');

  const { children } = props;

  if (!children && !plotband) return null;

  return (
    <PlotBandLineContext.Provider value={plotband}>
      {children}
    </PlotBandLineContext.Provider>
  );
});

PlotBand.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  from: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  color: PropTypes.string,
  children: PropTypes.node
};

PlotBand.displayName = 'PlotBand';
export default PlotBand;
