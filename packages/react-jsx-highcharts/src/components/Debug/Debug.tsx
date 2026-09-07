import { useEffect } from 'react';
import useChart from '../UseChart';

type DebugProps = {
  varName?: string;
};

/**
 * Debug component for exposing the chart instance as a global variable.
 *
 * @private
 */
const Debug = ({ varName = 'chart' }: DebugProps) => {
  const chart = useChart();

  useEffect(() => {
    // @ts-expect-error TODO
    window[varName] = chart.object;
    // eslint-disable-next-line no-console
    console.log(
      `Chart instance available as global variable as window.${varName}`
    );

    return () => {
      // @ts-expect-error TODO
      window[varName] = undefined;
    };
  }, [varName]);

  return null;
};

export default Debug;
