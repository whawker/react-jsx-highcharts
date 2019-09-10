import { useContext, useState } from 'react';
import SeriesContext from '../SeriesContext';
import createProvidedSeries from '../Series/createProvidedSeries';
import useChart from '../UseChart';
import useDelay from '../UseDelay';

export default function useSeries(seriesId) {
  const providedSeries = useContext(SeriesContext);

  const { getChart } = useChart();

  const createStateSeries = () => {
    if(providedSeries) return createProvidedSeries(providedSeries);

    if (seriesId) {
      const chart = getChart();
      const mySeries = chart.get(seriesId);
      return createProvidedSeries(mySeries);
    }
    return null;
  }

  const [series, setSeries] = useState(createStateSeries);

  useDelay(()=> {
    if(providedSeries) return; // we already had series
    // series should now be created
    setSeries(createStateSeries());
  });

  return series;
}
