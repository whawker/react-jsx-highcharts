import React, { useRef, useEffect, useState, memo, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import Hidden from '../Hidden';

const PlotBand = memo((props) => {
  const { id = uuid, children, getAxis, ...rest } = props;

  const idRef = useRef();

  const [rendered, setRendered] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    idRef.current = typeof id === 'function' ? id() : id;
    const myId = idRef.current;
    const axis = getAxis();
    const opts = {
      id: myId,
      ...rest
    }
    axis.addPlotBand(opts);
    if(!rendered) setRendered(true);
    return () => {
      const axis = getAxis();
      attempt(axis.removePlotBand, myId);
    }
  });

  if (!children || !rendered) return null;

  const bandChildren = Children.map(children, child => {
    if (isValidElement(child) === false) return child;
    return cloneElement(child, { id: idRef.current });
  });

  return (
    <Hidden>
      {bandChildren}
    </Hidden>
  );
})

PlotBand.propTypes = {
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
  from: PropTypes.any.isRequired,
  to: PropTypes.any.isRequired,
  color: PropTypes.string,
  getAxis: PropTypes.func // Provided by AxisProvider
};

PlotBand.displayName = 'PlotBand';
export default PlotBand;
