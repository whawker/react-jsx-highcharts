import { useEffect, useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import {
  getNonEventHandlerProps,
  getEventsConfig
} from '../../utils/events.ts';
import ColorAxisContext from '../ColorAxisContext/index.ts';
import useModifiedProps from '../UseModifiedProps/index.ts';
import useChart from '../UseChart/index.ts';
import createProvidedColorAxis from './createProvidedColorAxis.ts';

import type { ReactNode } from 'react';
import type {
  Axis,
  AxisSetExtremesEventCallbackFunction,
  LegendItemClickCallbackFunction,
  ColorAxisOptions
} from 'highcharts';
import type { ChartContextValue } from '../UseChart/index.ts';
import type { ColorAxisContextValue } from '../ColorAxisContext/index.ts';

type ColorAxisProps = {
  children?: ReactNode;
  onAfterSetExtremes?: AxisSetExtremesEventCallbackFunction;
  onLegendItemClick?: LegendItemClickCallbackFunction;
  onSetExtremes?: AxisSetExtremesEventCallbackFunction;
} & Partial<ColorAxisOptions>;

const ColorAxis = ({ children = null, ...restProps }: ColorAxisProps) => {
  const chart = useChart();
  const colorAxisRef = useRef<Axis>(null);
  const providedColorAxisRef = useRef<ColorAxisContextValue>(null);
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

// @ts-expect-error TODO
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

// @ts-expect-error TODO
const createColorAxis = (chart: ChartContextValue, props) => {
  const opts = getColorAxisConfig(props);
  return chart.addColorAxis(opts, false);
};

export default ColorAxis;
