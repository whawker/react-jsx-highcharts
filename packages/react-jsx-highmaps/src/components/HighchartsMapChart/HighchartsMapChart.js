import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BaseChart } from 'react-jsx-highcharts';

class HighchartsMapChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  static defaultProps = {
    callback: () => {}
  };

  getGeoJSON = map => {
    if (!map) return;
    return (typeof map === 'string') ? this.props.getHighcharts().maps[map] : map;
  }

  callback = geojson => chart => {
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
    const geojson = this.getGeoJSON(map);

    return (
      <BaseChart
        chart={{ ...chart, map: geojson }}
        mapNavigation={{ enabled: false }}
        {...rest}
        callback={this.callback(geojson)}
        chartCreationFunc={this.props.getHighcharts().mapChart}
        chartType="mapChart" />
    );
  }
}

export default HighchartsMapChart;
