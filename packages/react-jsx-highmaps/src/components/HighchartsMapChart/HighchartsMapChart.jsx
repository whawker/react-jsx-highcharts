import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { BaseChart, useHighcharts } from 'react-jsx-highcharts';

const XAXIS = { id: 'xAxis' };
const YAXIS = { id: 'yAxis' };
const MAP_NAVIGATION = { enabled: false };

const HighchartsMapChart = ({ map, chart, callback, ...restProps }) => {
  const Highcharts = useHighcharts();
  const geojson = useMemo(() => {
    return createGeoJSON(map, Highcharts);
  }, [map]);
  const chartConfig = useMemo(
    () => ({ ...chart, map: geojson }),
    [geojson, chart]
  );

  const chartCallback = useCallback(
    cbChart => {
      if (geojson) {
        const format = Highcharts.format;
        const { mapText, mapTextFull } = cbChart.options.credits;
        cbChart.mapCredits = format(mapText, { geojson });
        cbChart.mapCreditsFull = format(mapTextFull, { geojson });
      }

      if (callback) callback(cbChart);
    },
    [callback]
  );

  return (
    <BaseChart
      chart={chartConfig}
      mapNavigation={MAP_NAVIGATION}
      xAxis={XAXIS}
      yAxis={YAXIS}
      {...restProps}
      callback={chartCallback}
      chartCreationFunc={Highcharts.mapChart}
      chartType="mapChart"
    />
  );
};

const createGeoJSON = (map, Highcharts) => {
  if (!map) return;

  return typeof map === 'string' ? Highcharts.maps[map] : map;
};
export default HighchartsMapChart;
