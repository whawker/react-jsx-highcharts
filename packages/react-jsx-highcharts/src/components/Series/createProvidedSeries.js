export default function createProvidedSeries(series) {
  if (!series) return null;

  return {
    object: series,
    id: series.userOptions && series.userOptions.id,
    type: series.type,
    update: series.update.bind(series),
    remove: series.remove.bind(series),
    setData: series.setData.bind(series),
    setVisible: series.setVisible.bind(series)
  };
}
