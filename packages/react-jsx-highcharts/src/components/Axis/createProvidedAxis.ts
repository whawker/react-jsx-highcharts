import type { Axis as HighchartsAxis } from 'highcharts';
import type { AxisContextValue } from '../AxisContext';

const createProvidedAxis = (axis: HighchartsAxis): AxisContextValue | null => {
  if (!axis) return null;

  return {
    object: axis,
    // @ts-expect-error TODO
    id: axis.userOptions && axis.userOptions.id,
    type: axis.coll,
    update: axis.update.bind(axis),
    remove: axis.remove.bind(axis),
    // @ts-expect-error TODO
    addPlotBandOrLine: axis.addPlotBandOrLine.bind(axis),
    // @ts-expect-error TODO
    removePlotBandOrLine: axis.removePlotBandOrLine.bind(axis),
    getExtremes: axis.getExtremes.bind(axis),
    setExtremes: axis.setExtremes.bind(axis),
    setTitle: axis.setTitle.bind(axis)
  };
};

export default createProvidedAxis;
