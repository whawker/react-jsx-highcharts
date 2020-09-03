import * as React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import ChartContext from '../ChartContext';
import usePrevious from '../UsePrevious';
import { validChartTypes } from '../../utils/propTypeValidators';
import createProvidedChart from './createProvidedChart';

const noop = c => c;

const BaseChart = ({
  children = null,
  callback = noop,
  className = '',
  containerProps = null,
  ...restProps
}) => {
  const [rendered, setRendered] = useState(false);
  const domNodeRef = useRef(null);
  const chartRef = useRef(null);
  const providedChartRef = useRef(null);

  useLayoutEffect(() => {
    const myChart = initHighcharts(restProps, domNodeRef.current);
    chartRef.current = myChart;
    providedChartRef.current = createProvidedChart(
      myChart,
      restProps.chartType
    );

    callback(myChart);
    setRendered(true);
  }, []);

  useEffect(() => {
    const myChart = chartRef.current;
    return () => {
      if (myChart) {
        // Fixes #14
        window.requestAnimationFrame(myChart.destroy.bind(myChart));
        myChart.__destroyed = true;
      }
    };
  }, []);

  const prevProps = usePrevious(restProps);
  useEffect(() => {
    if (!rendered) return;
    const { plotOptions } = restProps;
    const myChart = chartRef.current;

    if (Object.is(prevProps.plotOptions, plotOptions) === false && myChart) {
      myChart.update({ plotOptions }, false);
      providedChartRef.current.needsRedraw();
    }
  });

  return (
    <div {...containerProps} className={`chart ${className}`} ref={domNodeRef}>
      {rendered && (
        <ChartContext.Provider value={providedChartRef.current}>
          {children}
        </ChartContext.Provider>
      )}
    </div>
  );
};

const initHighcharts = (props, domNode) => {
  if (!domNode) {
    return;
  }

  const {
    chartCreationFunc,
    callback,
    chart,
    polar,
    gauge,
    styledMode = false,
    children,
    ...rest
  } = props;

  const opts = {
    chart: {
      styledMode,
      ...chart
    },
    title: {
      text: null
    },
    subtitle: {
      text: null
    },
    legend: {
      enabled: false
    },
    rangeSelector: {
      enabled: false
    },
    navigator: {
      enabled: false
    },
    scrollbar: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    series: [],
    xAxis: [],
    yAxis: [],
    ...rest
  };
  const myChart = chartCreationFunc(domNode, opts);

  myChart.polar = polar;
  myChart.angular = gauge;

  return myChart;
};

BaseChart.propTypes = {
  chartCreationFunc: PropTypes.func.isRequired,
  chartType: validChartTypes.isRequired
};

export default BaseChart;
