import * as React from 'react';
import { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

const EMPTY_ARRAY = [];

const Series = memo(
  ({
    id = uuid,
    data = EMPTY_ARRAY,
    isDataEqual = Object.is,
    type = 'line',
    visible = true,
    children = null,
    axisId,
    requiresAxis = true,
    jsxOptions,
    ...restProps
  }) => {
    const seriesProps = { id, data, type, visible, ...restProps };

    /*
      if (defaultTo(restProps.requiresAxis, true)) {
        const axis = getAxis();
        if(!axis) throw new Error(`Series type="${restProps.type}" should be wrapped inside Axis`);
      }
    */
    const Highcharts = useHighcharts();
    const { addSeries, needsRedraw } = useChart();

    if (process.env.NODE_ENV === 'development') {
      const seriesTypes = Object.keys(Highcharts.seriesTypes);
      if (seriesTypes.indexOf(type) === -1) logSeriesErrorMessage(type);
    }

    const seriesRef = useRef(null);
    const [, setHasSeries] = useState(false);
    const providerValueRef = useRef(null);

    const axis = useAxis(axisId);
    const colorAxis = useColorAxis();

    useEffect(() => {
      if (requiresAxis && !axis) return;
      const opts = getSeriesConfig(seriesProps, axis, colorAxis, requiresAxis);
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
        series.update(nonEventProps, false);

        // update changed eventhandlers
        const modifiedEvents = getEventsConfig(modifiedProps);
        const prevEvents = getEventsConfig(prevProps);
        Object.keys(modifiedEvents).forEach(eventName => {
          const oldHandler = prevEvents[eventName];
          if (oldHandler) {
            Highcharts.removeEvent(series, eventName, oldHandler);
          }
          const newHandler = modifiedEvents[eventName];
          if (newHandler) {
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

Series.displayName = 'Series';

Series.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  type: PropTypes.string,
  data: PropTypes.any,
  isDataEqual: PropTypes.func,
  visible: PropTypes.bool,
  children: PropTypes.node,
  axisId: PropTypes.string,
  requiresAxis: PropTypes.bool,
  jsxOptions: PropTypes.shape({
    animation: PropTypes.bool,
    updatePoints: PropTypes.bool
  })
};

const getSeriesConfig = (props, axis, colorAxis, requiresAxis) => {
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
    config.colorAxis = colorAxis.id;
  }
  if (requiresAxis) {
    config[axis.type] = axis.id;
  }

  return config;
};

export default Series;
