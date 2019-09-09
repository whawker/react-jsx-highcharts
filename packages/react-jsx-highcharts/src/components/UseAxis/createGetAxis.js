import clean from '../../utils/removeProvidedProps';

const createGetAxis = axis => () => {
  if(!axis) return null;

  return {
    object: axis,
    id: axis.userOptions && axis.userOptions.id,
    type: axis.coll,
    update: clean(axis.update.bind(axis)),
    remove: axis.remove.bind(axis),
    addPlotBand: clean(axis.addPlotBand.bind(axis)),
    removePlotBand: axis.removePlotBand.bind(axis),
    addPlotLine: clean(axis.addPlotLine.bind(axis)),
    removePlotLine: axis.removePlotLine.bind(axis),
    getExtremes: axis.getExtremes.bind(axis),
    setExtremes: axis.setExtremes.bind(axis),
    setTitle: clean(axis.setTitle.bind(axis))
  }
}

export default createGetAxis;
