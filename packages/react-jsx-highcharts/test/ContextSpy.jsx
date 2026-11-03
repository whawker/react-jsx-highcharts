import { useEffect } from 'react';
import {
  useAxis,
  useChart,
  useHighcharts,
  useSeries,
  usePlotBand,
  usePlotLine
} from '../src';

const ContextSpy = ({
  axisId,
  axisRef,
  chartRef,
  highchartsRef,
  seriesRef,
  plotBandRef,
  plotLineRef
}) => {
  const axis = useAxis(axisId);
  const chart = useChart();
  const Highcharts = useHighcharts();
  const series = useSeries();
  const plotband = usePlotBand();
  const plotline = usePlotLine();

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
      axisRef.addPlotBandSpy = vi.spyOn(axis, 'addPlotBand');
      axisRef.removePlotBandSpy = vi.spyOn(axis, 'removePlotBand');

      axisRef.addPlotLineSpy = vi.spyOn(axis, 'addPlotLine');
      axisRef.removePlotLineSpy = vi.spyOn(axis, 'removePlotLine');
    }

    return () => {
      if (axisRef) {
        axisRef.addPlotBandSpy.mockRestore();
        axisRef.removePlotBandSpy.mockRestore();

        axisRef.addPlotLineSpy.mockRestore();
        axisRef.removePlotLineSpy.mockRestore();
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
    if (plotBandRef) {
      plotBandRef.current = plotband;
    }

    return () => {
      if (plotBandRef) {
        plotBandRef.current = null;
      }
    };
  }, [plotband]);

  useEffect(() => {
    if (plotLineRef) {
      plotLineRef.current = plotline;
    }

    return () => {
      if (plotLineRef) {
        plotLineRef.current = null;
      }
    };
  }, [plotline]);

  return null;
};

export default ContextSpy;
