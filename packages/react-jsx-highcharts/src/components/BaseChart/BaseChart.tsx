import * as React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import ChartContext from '../ChartContext';
import usePrevious from '../UsePrevious';
import createProvidedChart from './createProvidedChart';

import type { Chart, Options as ChartOptions } from 'highcharts';
import type { ReactNode, HTMLAttributes } from 'react';
import type { ChartContextValue } from '../ChartContext';

const noop = (c: unknown) => c;

type BaseChartProps = {
  children?: ReactNode;
  callback?: (chart: Chart) => unknown;
  className?: string;
  containerProps?: HTMLAttributes<HTMLDivElement> | null;
  chartType?: 'chart' | 'stockChart' | 'mapChart';
  chartCreationFunc: (renderTo: HTMLDivElement, options: ChartOptions) => Chart;
} & Partial<ChartOptions>;

/**
 * @private
 */
const BaseChart = ({
  children = null,
  callback = noop,
  className = '',
  containerProps = null,
  ...restProps
}: BaseChartProps) => {
  const [rendered, setRendered] = useState(false);
  const domNodeRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef(null);
  const providedChartRef = useRef<ChartContextValue>(null);

  useLayoutEffect(() => {
    const myChart = initHighcharts(restProps, domNodeRef.current);
    chartRef.current = myChart;
    providedChartRef.current = createProvidedChart(
      myChart,
      // @ts-expect-error TODO
      restProps.chartType
    );

    callback(myChart);
    setRendered(true);
  }, []);

  useEffect(() => {
    const myChart = chartRef.current;
    return () => {
      if (myChart) {
        // @ts-expect-error destroy is not a typed property on Chart
        myChart.destroy.bind(myChart)();
        // @ts-expect-error __destroyed is not a typed property on Chart
        myChart.__destroyed = true;
      }
    };
  }, []);

  const prevProps = usePrevious(restProps);
  useEffect(() => {
    if (!rendered) return;
    const { plotOptions } = restProps;
    const myChart = chartRef.current;
    // @ts-expect-error TODO
    if (Object.is(prevProps.plotOptions, plotOptions) === false && myChart) {
      // @ts-expect-error TODO
      myChart.update({ plotOptions }, false);
      // @ts-expect-error TODO
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

const initHighcharts = (
  // @ts-expect-error TODO
  props,
  domNode: HTMLDivElement | null
) => {
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

export default BaseChart;
