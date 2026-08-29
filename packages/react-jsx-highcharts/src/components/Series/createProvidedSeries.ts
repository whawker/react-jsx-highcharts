import type { Series } from 'highcharts';
import type { SeriesContextValue } from '../SeriesContext';

export default function createProvidedSeries(
  series?: Series
): SeriesContextValue | null {
  if (!series) return null;

  return {
    object: series,
    // @ts-expect-error the id exists if series exists?
    id: series.userOptions && series.userOptions.id,
    type: series.type,
    update: series.update.bind(series),
    remove: series.remove.bind(series),
    setData: series.setData.bind(series),
    setVisible: series.setVisible.bind(series)
  };
}
