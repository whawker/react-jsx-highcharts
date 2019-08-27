import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BaseChart } from 'react-jsx-highcharts';
import memoizeOne from 'memoize-one';

const XAXIS = { id: 'xAxis' };
const YAXIS = { id: 'yAxis' };
const MAP_NAVIGATION = { enabled: false };

class HighchartsMapChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  static defaultProps = {
    callback: () => {}
  };

  createGeoJSON = map => {
    if (!map) return;
    this.geojson = (typeof map === 'string') ? this.props.getHighcharts().maps[map] : map;
  }

  getChartConfig = memoizeOne((chart, map) => {
    this.createGeoJSON(map);
    return { ...chart, map: this.geojson };
  })

  callback = chart => {
    const geojson = this.geojson;
    if (geojson) {
      const format = this.props.getHighcharts().format;
      const { mapText, mapTextFull } = chart.options.credits;
      chart.mapCredits = format(mapText, { geojson });
      chart.mapCreditsFull = format(mapTextFull, { geojson });
    }
    this.props.callback(chart)
  }

  render () {
    const { map, chart, ...rest } = this.props;
    const chartConfig = this.getChartConfig(chart, map);

    return (
      <BaseChart
        chart={chartConfig}
        mapNavigation={MAP_NAVIGATION}
        xAxis={XAXIS}
        yAxis={YAXIS}
        {...rest}
        callback={this.callback}
        chartCreationFunc={this.props.getHighcharts().mapChart}
        chartType="mapChart" />
    );
  }
}

export default HighchartsMapChart;
