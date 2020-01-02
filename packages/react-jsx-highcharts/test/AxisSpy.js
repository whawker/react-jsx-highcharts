import { useEffect } from 'react';
import { useAxis } from '../src';

const AxisSpy = ({ axisId, axisRef }) => {
  const axis = useAxis(axisId);

  useEffect(() => {
    const addPlotBandOrLineSpy = jest.spyOn(axis, 'addPlotBandOrLine');
    const removePlotBandOrLineSpy = jest.spyOn(axis, 'removePlotBandOrLine');

    axisRef.current = axis;
    axisRef.addPlotBandOrLineSpy = addPlotBandOrLineSpy;
    axisRef.removePlotBandOrLineSpy = removePlotBandOrLineSpy;
    return () => {
      addPlotBandOrLineSpy.mockRestore();
      removePlotBandOrLineSpy.mockRestore();
    };
  }, [axis]);

  return null;
};

export default AxisSpy;
