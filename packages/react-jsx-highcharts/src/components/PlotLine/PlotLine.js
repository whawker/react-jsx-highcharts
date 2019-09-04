import React, { useRef, useEffect, useState, memo, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { attempt } from 'lodash-es';
import Hidden from '../Hidden';

const PlotLine = memo((props) => {
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
    axis.addPlotLine(opts);
    if(!rendered) setRendered(true);
    return () => {
      const axis = getAxis();
      attempt(axis.removePlotLine, myId);
    }
  });

  if (!children || !rendered) return null;

  const lineChildren = Children.map(children, child => {
    if (isValidElement(child) === false) return child;
    return cloneElement(child, { id: idRef.current });
  });

  return (
    <Hidden>
      {lineChildren}
    </Hidden>
  );
})

PlotLine.propTypes = {
  id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
  value: PropTypes.any.isRequired,
  color: PropTypes.string,
  getAxis: PropTypes.func // Provided by AxisProvider
};

PlotLine.displayName = 'PlotLine';
export default PlotLine;
