const createProvidedAxis = axis => {
  if (!axis) return null;

  return {
    object: axis,
    id: axis.userOptions && axis.userOptions.id,
    type: axis.coll,
    update: axis.update.bind(axis),
    remove: axis.remove.bind(axis),
    addPlotBandOrLine: axis.addPlotBandOrLine.bind(axis),
    removePlotBandOrLine: axis.removePlotBandOrLine.bind(axis),
    getExtremes: axis.getExtremes.bind(axis),
    setExtremes: axis.setExtremes.bind(axis),
    setTitle: axis.setTitle.bind(axis)
  };
};

export default createProvidedAxis;
