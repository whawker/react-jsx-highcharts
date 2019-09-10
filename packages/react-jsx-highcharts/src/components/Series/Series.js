import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import { isEqual } from 'lodash-es';
import { attempt } from 'lodash-es';
import { defaultTo } from 'lodash-es';
import isImmutable from 'is-immutable';
import immutableEqual from 'immutable-is';
import { Provider } from '../SeriesContext';
import { getNonEventHandlerProps, getEventsConfig } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { logSeriesErrorMessage } from '../../utils/warnings';
import usePrevious from '../UsePrevious';
import useHighcharts from '../UseHighcharts';
import useChart from '../UseChart';
import useAxis from '../UseAxis';
import createProvidedSeries from './createProvidedSeries';


const EMPTY_ARRAY = [];

const Series = memo(({
  id = uuid,
  data = EMPTY_ARRAY,
  type = 'line',
  visible = true,
  children = null,
  axisId,
  requiresAxis = true,
  ...restProps
}) => {

  const seriesProps = { id, data, type, visible, requiresAxis, ...restProps };

  /*
  if (defaultTo(restProps.requiresAxis, true)) {
    const axis = getAxis();
    if(!axis) throw new Error(`Series type="${restProps.type}" should be wrapped inside Axis`);
  }
*/
  const getHighcharts = useHighcharts();
  const { getChart, needsRedraw } = useChart();

  if (process.env.NODE_ENV === 'development') {
    const { type } = restProps;
    const seriesTypes = Object.keys(getHighcharts().seriesTypes);
    if (seriesTypes.indexOf(type) === -1) logSeriesErrorMessage(type);
  }

  const seriesRef = useRef(null);
  const [, setHasSeries] = useState(false);
  const providerValueRef = useRef(null);

  const getAxis = useAxis(axisId);

  useEffect(() => {
    if (requiresAxis && !getAxis) return;
    const opts = getSeriesConfig(seriesProps, getAxis(), requiresAxis);

    seriesRef.current = getChart().addSeries(opts, false);
    providerValueRef.current = createProvidedSeries(seriesRef.current);

    setHasSeries(true);
    needsRedraw();
    return () => {
      const series = seriesRef.current;
      if (series && series.remove) {
        // Series may have already been removed, i.e. when Axis unmounted
        attempt(series.remove.bind(series), false);
        seriesRef.current = null;
        needsRedraw();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAxis]);

  const prevProps = usePrevious(seriesProps);

  useEffect(() => {
    if (!prevProps || !seriesRef.current) return;
    const series = seriesRef.current;
    const { visible, data, ...rest } = seriesProps;

    let doRedraw = false;
    // Using setData is more performant than update
    if (isImmutable(data) && immutableEqual(data, prevProps.data) === false) {
      series.setData(data.toJS(), false);
      doRedraw = true;
    } else if (isEqual(data, prevProps.data) === false) {
      series.setData(data, false);
      doRedraw = true;
    }
    if (visible !== prevProps.visible) {
      series.setVisible(visible, false);
      doRedraw = true;
    }

    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      series.update(modifiedProps, false);
      doRedraw = true;
    }
    if (doRedraw) {
      needsRedraw();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  if (!seriesRef.current) return null;

  return <Provider value={providerValueRef.current}>{children}</Provider>;
});

Series.displayName = 'Series';

Series.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  type: PropTypes.string,
  data: PropTypes.any,
  visible: PropTypes.bool,
  children: PropTypes.node,
  axisId: PropTypes.string,
  requiresAxis: PropTypes.bool
};

const getSeriesConfig = (props, axis, requiresAxis) => {
  const { id, data, ...rest } = props;

  const seriesId = typeof id === 'function' ? id() : id;
  const seriesData = isImmutable(data) ? data.toJS() : data;
  const nonEventProps = getNonEventHandlerProps(rest);
  const events = getEventsConfig(rest);

  const config = {
    id: seriesId,
    data: seriesData,
    events,
    ...nonEventProps
  };

  if (requiresAxis) {
    config[axis.type] = axis.id;
  }

  return config;
};

export default Series;
