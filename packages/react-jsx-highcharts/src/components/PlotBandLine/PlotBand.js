import React, { useRef, useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import PlotBandLineContext from './PlotBandLineContext';
import useModifiedProps from '../UseModifiedProps';

const PlotBand = memo(props => {
  const { id = uuid, children, getAxis, ...rest } = props;

  const idRef = useRef();
  const [plotband, setPlotband] = useState(null);
  const modifiedProps = useModifiedProps(rest);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (modifiedProps !== false && plotband) {
      const axis = getAxis();
      axis.removePlotBand(idRef.current);
      const opts = {
        id: idRef.current,
        ...modifiedProps
      };
      setPlotband(axis.addPlotBand(opts));
    }
  });

  // create plotline
  useEffect(() => {
    idRef.current = typeof id === 'function' ? id() : id;
    const myId = idRef.current;
    const opts = {
      id: myId,
      ...rest
    };
    const axis = getAxis();
    setPlotband(axis.addPlotBand(opts));

    return () => {
      const axis = getAxis();
      attempt(axis.removePlotBand, idRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!children || !plotband) return null;

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
  getAxis: PropTypes.func // Provided by AxisProvider
};

PlotBand.displayName = 'PlotBand';
export default PlotBand;
