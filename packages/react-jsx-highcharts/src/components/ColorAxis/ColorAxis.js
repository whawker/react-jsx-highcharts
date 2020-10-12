import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getNonEventHandlerProps, getEventsConfig } from '../../utils/events';
import ColorAxisContext from '../ColorAxisContext';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';
import createProvidedColorAxis from './createProvidedColorAxis';

const ColorAxis = ({ children = null, ...restProps }) => {
  const chart = useChart();
  const colorAxisRef = useRef(null);
  const providedColorAxisRef = useRef(null);
  const [hasColorAxis, setHasColorAxis] = useState(false);

  useEffect(() => {
    const colorAxis = createColorAxis(chart, restProps);
    colorAxisRef.current = colorAxis;
    providedColorAxisRef.current = createProvidedColorAxis(
      colorAxisRef.current
    );
    setHasColorAxis(true);
    chart.needsRedraw();

    return () => {
      if (colorAxis && colorAxis.remove) {
        try {
          colorAxis.remove.bind(colorAxis)(false);
        } catch {
          // Axis may have already been removed, i.e. when Chart unmounted
        }
        chart.needsRedraw();
      }
    };
  }, []);

  const modifiedProps = useModifiedProps(restProps);

  useEffect(() => {
    if (colorAxisRef.current !== null && modifiedProps !== false) {
      const colorAxis = colorAxisRef.current;
      colorAxis.update(modifiedProps, false);
      chart.needsRedraw();
    }
  });

  if (!hasColorAxis) return null;

  return (
    <ColorAxisContext.Provider value={providedColorAxisRef.current}>
      {children}
    </ColorAxisContext.Provider>
  );
};

const getColorAxisConfig = props => {
  const { id = uuid, ...rest } = props;

  const colorAxisId = typeof id === 'function' ? id() : id;
  const nonEventProps = getNonEventHandlerProps(rest);
  const events = getEventsConfig(rest);

  return {
    id: colorAxisId,
    events,
    ...nonEventProps
  };
};

const createColorAxis = (chart, props) => {
  const opts = getColorAxisConfig(props);
  return chart.addColorAxis(opts, false);
};

export default ColorAxis;
