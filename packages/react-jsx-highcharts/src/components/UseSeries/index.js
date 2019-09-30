import { useContext, useState, useDebugValue } from 'react';
import SeriesContext from '../SeriesContext';
import createProvidedSeries from '../Series/createProvidedSeries';
import useChart from '../UseChart';
import useDelayOnce from '../UseDelayOnce';

export default function useSeries(seriesId) {
  const providedSeries = useContext(SeriesContext);

  const chart = useChart();

  const createStateSeries = () => {
    if (providedSeries) return createProvidedSeries(providedSeries);

    if (seriesId) {
      const mySeries = chart.get(seriesId);
      return createProvidedSeries(mySeries);
    }
    return null;
  };

  const [series, setSeries] = useState(createStateSeries);

  useDelayOnce(() => {
    if (series) return; // we already had series
    // series should now be created
    setSeries(createStateSeries());
  });

  useDebugValue(series ? series.id : null);

  return series;
}
