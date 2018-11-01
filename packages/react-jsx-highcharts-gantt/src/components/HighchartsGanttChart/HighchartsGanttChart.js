import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { BaseChart } from 'react-jsx-highcharts';

class HighchartsGanttChart extends Component {
  static propTypes = {
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  render() {
    const {chart, ...rest} = this.props;

    return (
      <BaseChart
        chart={{...chart}}
        xAxis={{id: 'xAxis'}}
        yAxis={{id: 'yAxis'}}
        {...rest}
        chartCreationFunc={this.props.getHighcharts().ganttChart}
        chartType="ganttChart"/>
    );
  }
}

export default HighchartsGanttChart;
