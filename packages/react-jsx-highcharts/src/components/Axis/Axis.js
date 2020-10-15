import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import AxisContext from '../AxisContext';
import { getNonEventHandlerProps, getEventsConfig } from '../../utils/events';
import { validAxisTypes } from '../../utils/propTypeValidators';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';
import createProvidedAxis from './createProvidedAxis';

const Axis = ({ children = null, dynamicAxis = true, ...restProps }) => {
  const chart = useChart();
  const axisRef = useRef(null);
  const providedAxisRef = useRef(null);
  const [hasAxis, setHasAxis] = useState(false);

  useEffect(() => {
    const axis = createAxis(chart, restProps, dynamicAxis);
    axisRef.current = axis;
    providedAxisRef.current = createProvidedAxis(axisRef.current);
    setHasAxis(true);
    chart.needsRedraw();

    return () => {
      if (axis.remove && dynamicAxis) {
        try {
          axis.remove.bind(axis)(false);
        } catch {
          // Axis may have already been removed, i.e. when Chart unmounted
        }
        chart.needsRedraw();
      }
    };
  }, []);

  const modifiedProps = useModifiedProps(restProps);
  useEffect(() => {
    if (!hasAxis) return;
    if (modifiedProps !== false) {
      const axis = axisRef.current;
      // if there are plotlines or bands, the chart needs to be redrawn before
      // they can be accessed
      if (axis.plotLinesAndBands && axis.plotLinesAndBands.length > 0) {
        axis.update(modifiedProps, true);
      } else {
        axis.update(modifiedProps, false);
        chart.needsRedraw();
      }
    }
  });

  if (!hasAxis) return null;

  return (
    <AxisContext.Provider value={providedAxisRef.current}>
      {children}
    </AxisContext.Provider>
  );
};

const getAxisConfig = props => {
  const { id = uuid, ...rest } = props;

  const axisId = typeof id === 'function' ? id() : id;
  const nonEventProps = getNonEventHandlerProps(rest);
  const events = getEventsConfig(rest);

  return {
    id: axisId,
    title: { text: null },
    events,
    ...nonEventProps
  };
};

const createAxis = (chart, props, dynamicAxis) => {
  const { id = uuid, isX } = props;

  // Create Highcharts Axis
  const opts = getAxisConfig(props);
  let axis;
  if (dynamicAxis) {
    axis = chart.addAxis(opts, isX, false);
  } else {
    // ZAxis cannot be added dynamically, Maps only have a single axes - update instead
    const axisId = typeof id === 'function' ? id() : id;
    axis = chart.get(axisId);
    axis.update.call(axis, opts, false);
  }
  return axis;
};

Axis.propTypes = {
  type: validAxisTypes,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  dynamicAxis: PropTypes.bool
};

export default Axis;
