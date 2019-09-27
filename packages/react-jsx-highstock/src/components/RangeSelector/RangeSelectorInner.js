import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import { useHighcharts, useAxis, useChart, useModifiedProps } from 'react-jsx-highcharts';

const RangeSelectorInner = ({ enabled = true, ...restProps }) => {
  const props = { enabled, ...restProps };
  const [rendered, setRendered] = useState(false);
  const Highcharts = useHighcharts();
  const chart = useChart();
  const axis = useAxis();


  useEffect(() => {
    if (!axis) return;

    // Workaround inferred from http://jsfiddle.net/x40me94t/2/
    const chartObj = chart.object;
    chartObj.options.rangeSelector.enabled = true;
    Highcharts.fireEvent(chartObj, 'init'); // Pre Highcharts 6.1
    Highcharts.fireEvent(chartObj, 'afterGetContainer'); // Highcharts 6.1+

    const opts = getRangeSelectorConfig(props, Highcharts);
    updateRangeSelector(opts, chart);

    const renderRangeSelector = createRenderRangeSelector(chart, axis);
    const axisObj = axis.object;
    Highcharts.addEvent(axisObj, 'afterSetExtremes', renderRangeSelector);

    setRendered(true);

    return (() => {
      const axisObj = axis.object;
      Highcharts.removeEvent(axisObj, 'afterSetExtremes', renderRangeSelector);

      attempt(updateRangeSelector, { enabled: false }, chart);
    })
  },[axis])

  const modifiedProps = useModifiedProps(props);

  useEffect(() => {
    if(!axis) return;

    if (modifiedProps !== false) {
      updateRangeSelector(modifiedProps, chart);
    }
  })

  const { children } = props;
  if (!children || !rendered) return null;

  return (
    <>{children}</>
  );
}

const getRangeSelectorConfig = (props, Highcharts) => {
  const { children, ...rest } = props;

  return {
    ...(Highcharts.defaultOptions && Highcharts.defaultOptions.rangeSelector),
    ...rest,
    inputEnabled: false,
    buttons: []
  };
}

const updateRangeSelector = (config, chart) => {
  chart.update({
    rangeSelector: config
  }, true);
}

const createRenderRangeSelector = (chart, axis) => {
  return () => {
    const chartObj = chart.object;
    const extremes = axis.getExtremes();
    // Fixes #40
    chartObj.rangeSelector.render.call(chartObj.rangeSelector, extremes.min, extremes.max);
  }
}

RangeSelectorInner.propTypes = {
  enabled: PropTypes.bool
};

export default RangeSelectorInner;
