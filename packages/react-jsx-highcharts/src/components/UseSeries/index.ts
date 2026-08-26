import { useContext, useState, useEffect, useDebugValue } from 'react';
import SeriesContext from '../SeriesContext';
import useChart from '../UseChart';
import createProvidedSeries from '../Series/createProvidedSeries';

export default function useSeries(seriesId) {
  const contextSeries = useContext(SeriesContext);
  const chart = useChart();

  const createStateSeries = () => {
    if (contextSeries) return contextSeries;

    if (seriesId) {
      const mySeries = chart.get(seriesId);
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
