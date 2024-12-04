import { useEffect } from 'react';
import {
  useAxis,
  useChart,
  useHighcharts,
  useSeries,
  usePlotBandLine
} from '../src';

const ContextSpy = ({
  axisId,
  axisRef,
  chartRef,
  highchartsRef,
  seriesRef,
  plotBandLineRef
}) => {
  const axis = useAxis(axisId);
  const chart = useChart();
  const Highcharts = useHighcharts();
  const series = useSeries();
  const plotbandline = usePlotBandLine();

  useEffect(() => {
    if (highchartsRef) {
      highchartsRef.current = Highcharts;
    }

    return () => {
      if (highchartsRef) {
        highchartsRef.current = null;
      }
    };
  }, [Highcharts]);

  useEffect(() => {
    if (chartRef) {
      chartRef.current = chart;
    }

    return () => {
      if (chartRef) {
        chartRef.current = null;
      }
    };
  }, [chart]);

  useEffect(() => {
    if (axisRef) {
      axisRef.current = axis;
      axisRef.addPlotBandOrLineSpy = jest.spyOn(axis, 'addPlotBandOrLine');
      axisRef.removePlotBandOrLineSpy = jest.spyOn(
        axis,
        'removePlotBandOrLine'
      );
    }

    return () => {
      if (axisRef) {
        axisRef.addPlotBandOrLineSpy.mockRestore();
        axisRef.removePlotBandOrLineSpy.mockRestore();
        axisRef.current = null;
      }
    };
  }, [axis]);

  useEffect(() => {
    if (seriesRef) {
      seriesRef.current = series;
    }

    return () => {
      if (seriesRef) {
        seriesRef.current = null;
      }
    };
  }, [series]);

  useEffect(() => {
    if (plotBandLineRef) {
      plotBandLineRef.current = plotbandline;
    }

    return () => {
      if (plotBandLineRef) {
        plotBandLineRef.current = null;
      }
    };
  }, [plotbandline]);

  return null;
};

export default ContextSpy;
