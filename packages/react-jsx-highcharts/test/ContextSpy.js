import { useEffect } from 'react';
import { useAxis, useChart, useHighcharts } from '../src';

const ContextSpy = ({ axisId, axisRef, chartRef, highchartsRef }) => {
  const axis = useAxis(axisId);
  const chart = useChart();
  const Highcharts = useHighcharts();

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

  return null;
};

export default ContextSpy;
