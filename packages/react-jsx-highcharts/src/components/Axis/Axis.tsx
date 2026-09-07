import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import AxisContext from '../AxisContext';
import { getNonEventHandlerProps, getEventsConfig } from '../../utils/events';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';
import createProvidedAxis from './createProvidedAxis';

import type { ReactNode } from 'react';
import type { ChartContextValue } from '../UseChart';
import type {
  XAxisOptions,
  YAxisOptions,
  ZAxisOptions,
  Axis as HighchartsAxis
} from 'highcharts';
import type { AxisContextValue } from '../AxisContext';

type BaseAxisProps = {
  children?: ReactNode;
  dynamicAxis?: boolean;
  isX?: boolean;
};
export type XAxisProps = BaseAxisProps & XAxisOptions;
export type YAxisProps = BaseAxisProps & YAxisOptions;
export type ZAxisProps = BaseAxisProps & ZAxisOptions;

type AxisProps = XAxisProps | YAxisProps | ZAxisProps;

/**
 *
 * @private
 */
const Axis = ({
  children = null,
  dynamicAxis = true,
  ...restProps
}: AxisProps) => {
  const chart = useChart();
  const axisRef = useRef<HighchartsAxis>(null);
  const providedAxisRef = useRef<AxisContextValue>(null);
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
      const nonEventProps = getNonEventHandlerProps(modifiedProps);
      const events = getEventsConfig(restProps); // update all events to be on safeside
      const updateProps = {
        events,
        ...nonEventProps
      };
      // if there are plotlines or bands, the chart needs to be redrawn before
      // they can be accessed
      // @ts-expect-error TODO
      if (axis.plotLinesAndBands && axis.plotLinesAndBands.length > 0) {
        // @ts-expect-error TODO
        axis.update(updateProps, true);
      } else {
        // @ts-expect-error TODO
        axis.update(updateProps, false);
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

const getAxisConfig = (
  props: { isX?: boolean } & (XAxisOptions | YAxisOptions | ZAxisOptions)
) => {
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

const createAxis = (
  chart: ChartContextValue,
  props: { isX?: boolean } & (XAxisOptions | YAxisOptions | ZAxisOptions),
  dynamicAxis: boolean
) => {
  const { id = uuid, isX } = props;

  // Create Highcharts Axis
  const opts = getAxisConfig(props);
  let axis;
  if (dynamicAxis) {
    // @ts-expect-error TODO
    axis = chart.addAxis(opts, isX, false);
  } else {
    // ZAxis cannot be added dynamically, Maps only have a single axes - update instead
    const axisId = typeof id === 'function' ? id() : id;
    axis = chart.get(axisId) as HighchartsAxis;
    // @ts-expect-error TODO
    axis.update.call(axis, opts, false);
  }
  return axis;
};

export default Axis;
