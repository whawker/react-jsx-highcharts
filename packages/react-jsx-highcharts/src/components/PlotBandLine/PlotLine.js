import React, { useRef, useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import PlotBandLineContext from './PlotBandLineContext';
import useModifiedProps from '../UseModifiedProps';
import useAxis from '../UseAxis';

const PlotLine = memo(props => {
  const { id = uuid, children, ...rest } = props;

  const getAxis = useAxis();
  const idRef = useRef();
  const [plotline, setPlotline] = useState(null);
  const modifiedProps = useModifiedProps(rest);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!getAxis) return;
    if (modifiedProps !== false && plotline) {
      const axis = getAxis();
      axis.removePlotLine(idRef.current);
      const opts = {
        id: idRef.current,
        ...modifiedProps
      };
      setPlotline(axis.addPlotLine(opts));
    }
  });

  // create plotline
  useEffect(() => {
    if (!getAxis) return;
    idRef.current = typeof id === 'function' ? id() : id;
    const myId = idRef.current;
    const opts = {
      id: myId,
      ...rest
    };
    const axis = getAxis();
    setPlotline(axis.addPlotLine(opts));

    return () => {
      const axis = getAxis();
      attempt(axis.removePlotLine, idRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ getAxis ]);

  if (!children && !plotline) return null;

  return (
    <PlotBandLineContext.Provider value={plotline}>
      {children}
    </PlotBandLineContext.Provider>
  );
});

PlotLine.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  value: PropTypes.any.isRequired,
  color: PropTypes.string,
  children: PropTypes.node
};

PlotLine.displayName = 'PlotLine';
export default PlotLine;
