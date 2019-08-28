import React from 'react';
import BaseChart from '../BaseChart';
import useHighcharts from '../UseHighcharts';

const HighchartsChart = (props) => {
  const getHighcharts = useHighcharts();

  return (
    <BaseChart
      {...props}
      getHighcharts={getHighcharts}
      chartCreationFunc={getHighcharts().chart}
      chartType="chart" />
  )
}

export default HighchartsChart;
