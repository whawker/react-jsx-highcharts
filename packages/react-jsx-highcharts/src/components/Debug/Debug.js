import { useEffect } from 'react';
import useChart from '../UseChart';

const Debug = ({ varName = 'chart' }) => {
  const chart = useChart();

  useEffect(() => {
    window[varName] = chart.object;
    // eslint-disable-next-line no-console
    console.log(
      `Chart instance available as global variable as window.${varName}`
    );

    return () => {
      window[varName] = undefined;
    };
  }, [varName]);

  return null;
};

export default Debug;
