import { useContext, useState, useEffect, useDebugValue } from 'react';
import SeriesContext from '../SeriesContext/index.ts';
import useChart from '../UseChart/index.ts';
import createProvidedSeries from '../Series/createProvidedSeries.ts';

import type { Series } from 'highcharts';
import type { SeriesContextValue } from '../SeriesContext/index.ts';

export default function useSeries(seriesId: string): SeriesContextValue | null {
  const contextSeries = useContext(SeriesContext);
  const chart = useChart();

  const createStateSeries = () => {
    if (contextSeries) return contextSeries;

    if (seriesId) {
      const mySeries = chart.get(seriesId) as Series;
      return createProvidedSeries(mySeries);
    }
    return null;
  };

  const [providedSeries, setProvidedSeries] = useState(createStateSeries);
  useEffect(() => {
    if (providedSeries) return; // we already had series
    // series should now be created
    setProvidedSeries(createStateSeries());
  }, []);
  useDebugValue(providedSeries ? providedSeries.id : null);

  return providedSeries;
}
