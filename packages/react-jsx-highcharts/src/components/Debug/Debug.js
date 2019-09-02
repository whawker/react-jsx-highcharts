import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Hidden from '../Hidden';
import useChart from '../UseChart';

const Debug = ({ varName = 'chart' }) => {
  const { getChart } = useChart();

  useEffect(() => {
    const chart = getChart()
    window[varName] =  chart.object;
    // eslint-disable-next-line no-console
    console.log(`Chart instance available as global variable as window.${varName}`);
    return () => window[varName] = undefined;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [varName]);

  return (
    <Hidden />
  );
}

Debug.propTypes = {
  varName: PropTypes.string
};

export default Debug;
