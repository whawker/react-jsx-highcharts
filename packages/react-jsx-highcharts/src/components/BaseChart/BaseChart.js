import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from '../../utils/debounce-raf';
import { attempt } from 'lodash-es'
import ChartContext from '../ChartContext';
import { validChartTypes } from '../../utils/propTypeValidators'
import usePrevious from '../UsePrevious';

const BaseChart = ({ children = null, callback, className = '', ...restProps}) => {

  const [rendered, setRendered] = useState(false);
  const domNodeRef = useRef(null);
  const chartRef = useRef(null);
  const providerValueRef = useRef(null);

  useLayoutEffect(() => {
    const myChart = initHighcharts(restProps, domNodeRef.current);
    chartRef.current = myChart;

    const needsRedraw = debounce(() => {
      if(!myChart.__destroyed) {
        attempt(myChart.redraw.bind(myChart));
      }
    });
    const providedChart = {
      object: myChart,
      type: restProps.chartType,
      get: myChart.get.bind(myChart),
      setSize: myChart.setSize.bind(myChart),
      update: myChart.update.bind(myChart),
      addAxis: myChart.addAxis.bind(myChart),
      addSeries: myChart.addSeries.bind(myChart),
      setTitle: myChart.setTitle.bind(myChart),
      setCaption: myChart.setCaption.bind(myChart),
      showLoading: myChart.showLoading.bind(myChart),
      hideLoading: myChart.hideLoading.bind(myChart),
      addCredits: myChart.addCredits.bind(myChart),
      addAnnotation: myChart.addAnnotation ? myChart.addAnnotation.bind(myChart) : null,
      removeAnnotation: myChart.removeAnnotation ? myChart.removeAnnotation.bind(myChart) : null,
      needsRedraw
    };

    providerValueRef.current = providedChart;
    if(callback) callback(myChart);
    setRendered(true);
  },[]);

  useEffect(() => {
    return () => {
      const myChart = chartRef.current;
      if (myChart) { // Fixes #14
        window.requestAnimationFrame(myChart.destroy.bind(myChart));
        myChart.__destroyed = true;
      }
    }
  },[]);

  const prevProps = usePrevious(restProps);

  useEffect(() => {
    if(!rendered) return;
    const { plotOptions } = restProps;
    const myChart = chartRef.current;
    const needsRedraw = providerValueRef.current.needsRedraw;
    if (Object.is(prevProps.plotOptions, plotOptions) === false && myChart) {
      myChart.update({ plotOptions }, false);
      needsRedraw();
    }
  });

  return (
    <div
      className={`chart ${className}`}
      ref={ domNodeRef }>
      {rendered && (
        <ChartContext.Provider value={providerValueRef.current}>
          {children}
        </ChartContext.Provider>
      )}
    </div>
  );

}

const initHighcharts = (props, domNode) => {
  if (!domNode) {
    return;
  }

  const { chartCreationFunc, callback, chart, polar, gauge, styledMode = false, children, ...rest } = props;

  const opts = {
    chart: {
      styledMode,
      ...chart,
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
}


BaseChart.propTypes = {
  chartCreationFunc: PropTypes.func.isRequired,
  chartType: validChartTypes.isRequired,
};

export default BaseChart;
