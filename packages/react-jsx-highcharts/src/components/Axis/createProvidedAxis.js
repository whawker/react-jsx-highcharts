const createProvidedAxis = axis => {
  if (!axis) return null;

  return {
    object: axis,
    id: axis.userOptions && axis.userOptions.id,
    type: axis.coll,
    update: axis.update.bind(axis),
    remove: axis.remove.bind(axis),
    addPlotBandOrLine: axis.addPlotBandOrLine
      ? axis.addPlotBandOrLine.bind(axis)
      : (opts, coll) => {
          if (coll === 'plotBands') {
            const addPlotBand = axis.addPlotBand.bind(axis);
            addPlotBand(opts);
          } else if (coll === 'plotLines') {
            const addPlotLine = axis.addPlotLine.bind(axis);
            addPlotLine(opts);
          }
        },
    removePlotBandOrLine: axis.removePlotBandOrLine
      ? axis.removePlotBandOrLine.bind(axis)
      : id => {
          const removePlotBand = axis.removePlotBand.bind(axis);
          removePlotBand(id);
          const removePlotLine = axis.removePlotLine.bind(axis);
          removePlotLine(id);
        },
    getExtremes: axis.getExtremes.bind(axis),
    setExtremes: axis.setExtremes.bind(axis),
    setTitle: axis.setTitle.bind(axis)
  };
};

export default createProvidedAxis;
