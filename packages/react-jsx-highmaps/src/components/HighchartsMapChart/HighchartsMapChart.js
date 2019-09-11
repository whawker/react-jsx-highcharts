import React, { Component } from 'react';
import { BaseChart, HighchartsContext } from 'react-jsx-highcharts';
import memoizeOne from 'memoize-one';

const XAXIS = { id: 'xAxis' };
const YAXIS = { id: 'yAxis' };
const MAP_NAVIGATION = { enabled: false };

class HighchartsMapChart extends Component {

  static contextType = HighchartsContext;

  createGeoJSON = map => {
    if (!map) return;
    const Highcharts = this.context;

    this.geojson = (typeof map === 'string') ? Highcharts.maps[map] : map;
  }

  getChartConfig = memoizeOne((chart, map) => {
    this.createGeoJSON(map);
    return { ...chart, map: this.geojson };
  })

  callback = chart => {
    const geojson = this.geojson;
    if (geojson) {
      const Highcharts = this.context;
      const format = Highcharts.format;
      const { mapText, mapTextFull } = chart.options.credits;
      chart.mapCredits = format(mapText, { geojson });
      chart.mapCreditsFull = format(mapTextFull, { geojson });
    }
    if(this.props.callback) this.props.callback(chart)
  }

  render () {
    const { map, chart, ...rest } = this.props;
    const chartConfig = this.getChartConfig(chart, map);
    const Highcharts = this.context;

    return (
      <BaseChart
        chart={chartConfig}
        mapNavigation={MAP_NAVIGATION}
        xAxis={XAXIS}
        yAxis={YAXIS}
        {...rest}
        callback={this.callback}
        chartCreationFunc={Highcharts.mapChart}
        chartType="mapChart" />
    );
  }
}

export default HighchartsMapChart;
