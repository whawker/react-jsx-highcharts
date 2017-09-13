import { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highcharts';
import throttle from 'lodash/throttle';

class WithValues extends Component {

  static propTypes = {
    getChart: PropTypes.func, // Provided by ChartProvider
    getChartContainer: PropTypes.func // Provided by ChartProvider
  };

  componentDidMount () {
    Highcharts.Series.prototype.point = {}; // The active point
    const container = this.props.getChartContainer();
    container.addEventListener('mousemove', this.updateLegendValues, false);
    container.addEventListener('touchmove', this.updateLegendValues, false);
  }

  componentWillUnmount () {
    const container = this.props.getChartContainer();
    container.removeEventListener('mousemove', this.updateLegendValues);
    container.removeEventListener('touchmove', this.updateLegendValues);
  }

  updateLegendValues = throttle(() => {
    const { getChart, labelFormat, labelFormatter } = this.props;
    const chart = getChart();
    let hoverPoints = chart.hoverPoints;

    if (!hoverPoints && chart.hoverPoint) {
      if (!chart.hoverPoint) return;
      hoverPoints = [chart.hoverPoint];
    }
    if (hoverPoints) {
      hoverPoints.forEach(point => {
        point.series.point = point;
      });
      chart.legend.allItems.forEach(item => {
        item.legendItem.attr({
          text: labelFormat ? Highcharts.format(labelFormat, item) : labelFormatter.call(item)
        });
      });
      chart.legend.render();
    }
  }, 100);

  render () {
    const { children } = this.props;
    return children ? children : null;
  }
}

export default WithValues;
