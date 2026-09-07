import * as React from 'react';
import { memo, useRef, useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import SeriesContext from '../SeriesContext';
import { getNonEventHandlerProps, getEventsConfig } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { logSeriesErrorMessage } from '../../utils/warnings';
import usePrevious from '../UsePrevious';
import useHighcharts from '../UseHighcharts';
import useChart from '../UseChart';
import useAxis from '../UseAxis';
import useColorAxis from '../UseColorAxis';
import createProvidedSeries from './createProvidedSeries';

import type HC from 'highcharts';
import type { ReactNode } from 'react';
import type { SeriesContextValue } from '../SeriesContext';

// @ts-expect-error TODO
const EMPTY_ARRAY = [];

export type SeriesProps<TSeriesOptions = Partial<HC.SeriesOptions>> = {
  children?: ReactNode;
  jsxOptions?: {
    updatePoints?: boolean;
  };
  onAfterAnimate?: HC.SeriesAfterAnimateCallbackFunction;
  onCheckboxClick?: HC.SeriesEventsOptionsObject['checkboxClick'];
  onClick?: HC.SeriesClickCallbackFunction;
  onHide?: HC.SeriesHideCallbackFunction;
  onLegendItemClick?: HC.SeriesLegendItemClickCallbackFunction;

  onMouseOut?: HC.SeriesMouseOutCallbackFunction;
  onMouseOver?: HC.SeriesMouseOverCallbackFunction;
  onSetRootNode?: HC.SeriesEventsOptionsObject['setRootNode'];
  onShow?: HC.SeriesShowCallbackFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any; // TODO: this is here to allow unknown eventhandlers
} & Partial<Omit<TSeriesOptions, 'type'>>;

/**
 *
 * @private
 */
const Series = memo(
  <P,>({
    id = uuid,
    // @ts-expect-error TODO
    data = EMPTY_ARRAY,
    isDataEqual = Object.is,
    type = 'line',
    visible = true,
    children = null,
    axisId,
    requiresAxis = true,
    jsxOptions,
    ...restProps
  }: SeriesProps<P>) => {
    const seriesProps = { id, data, type, visible, ...restProps };

    /*
      if (defaultTo(restProps.requiresAxis, true)) {
        const axis = getAxis();
        if(!axis) throw new Error(`Series type="${restProps.type}" should be wrapped inside Axis`);
      }
    */
    const Highcharts = useHighcharts();
    const { addSeries, needsRedraw } = useChart();

    // @ts-expect-error process.env.NODE_ENV not defined
    if (process.env.NODE_ENV === 'development') {
      // @ts-expect-error Highcharts.seriesTypes not typed
      const seriesTypes = Object.keys(Highcharts.seriesTypes);
      if (seriesTypes.indexOf(type) === -1) logSeriesErrorMessage(type);
    }

    const seriesRef = useRef<HC.Series>(null);
    const [, setHasSeries] = useState(false);
    const providerValueRef = useRef<SeriesContextValue>(null);

    const axis = useAxis(axisId);
    const colorAxis = useColorAxis();

    useEffect(() => {
      if (requiresAxis && !axis) return;
      const opts = getSeriesConfig(seriesProps, axis, colorAxis, requiresAxis);
      // @ts-expect-error TODO
      const series = addSeries(opts, false);
      seriesRef.current = series;
      providerValueRef.current = createProvidedSeries(seriesRef.current);

      setHasSeries(true);
      needsRedraw();
      return () => {
        if (series && series.remove) {
          try {
            series.remove.bind(series)(false);
            seriesRef.current = null;
          } catch {
            // Series may have already been removed, i.e. when Axis unmounted
          }
          needsRedraw();
        }
      };
    }, [axis]);

    const prevProps = usePrevious(seriesProps);

    useEffect(() => {
      if (!prevProps) return;
      if (!seriesRef.current) return;

      const series = seriesRef.current;
      const { visible, data, ...rest } = seriesProps;

      let doRedraw = false;
      // Using setData is more performant than update
      if (isDataEqual(data, prevProps.data) === false) {
        // @ts-expect-error missing prop?
        const animation = jsxOptions && jsxOptions.animation;
        const updatePoints = jsxOptions && jsxOptions.updatePoints;
        series.setData(data, false, animation, updatePoints);
        doRedraw = true;
      }
      if (visible !== prevProps.visible) {
        series.setVisible(visible, false);
        doRedraw = true;
      }

      const modifiedProps = getModifiedProps(prevProps, rest);
      if (modifiedProps !== false) {
        const nonEventProps = getNonEventHandlerProps(modifiedProps);
        // @ts-expect-error TODO
        series.update(nonEventProps, false);

        // update changed eventhandlers
        const modifiedEvents = getEventsConfig(modifiedProps);
        const prevEvents = getEventsConfig(prevProps);
        Object.keys(modifiedEvents).forEach(eventName => {
          const oldHandler = prevEvents[eventName];
          if (oldHandler) {
            // @ts-expect-error TODO
            Highcharts.removeEvent(series, eventName, oldHandler);
          }
          const newHandler = modifiedEvents[eventName];
          if (newHandler) {
            // @ts-expect-error TODO
            Highcharts.addEvent(series, eventName, newHandler);
          }
        });

        doRedraw = true;
      }
      if (doRedraw) {
        needsRedraw();
      }
    });

    if (!seriesRef.current) return null;

    return (
      <SeriesContext.Provider value={providerValueRef.current}>
        {children}
      </SeriesContext.Provider>
    );
  }
);

// @ts-expect-error TODO
const getSeriesConfig = (props, axis, colorAxis, requiresAxis: boolean) => {
  const { id, data, ...rest } = props;

  const seriesId = typeof id === 'function' ? id() : id;
  const nonEventProps = getNonEventHandlerProps(rest);
  const events = getEventsConfig(rest);

  const config = {
    id: seriesId,
    data,
    events,
    ...nonEventProps
  };

  if (colorAxis) {
    // @ts-expect-error TODO
    config.colorAxis = colorAxis.id;
  }
  if (requiresAxis) {
    // @ts-expect-error TODO
    config[axis.type] = axis.id;
  }

  return config;
};

Series.displayName = 'Series';

export default Series;
