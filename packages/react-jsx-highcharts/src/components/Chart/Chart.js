import { Component } from 'react';
import PropTypes from 'prop-types';
import { addEventHandlersManually, getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

class Chart extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    onAddSeries: PropTypes.func,
    onAfterPrint: PropTypes.func,
    onBeforePrint: PropTypes.func,
    onClick: PropTypes.func,
    onLoad: PropTypes.func,
    onRedraw: PropTypes.func,
    onRender: PropTypes.func,
    onSelection: PropTypes.func,
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  static defaultProps = {
    type: 'line',
    onAddSeries: () => {},
    onAfterPrint: () => {},
    onBeforePrint: () => {},
    onClick: () => {},
    onLoad: () => {},
    onRedraw: () => {},
    onRender: () => {},
    onSelection: () => {}
  };

  componentDidMount () {
    const { getHighcharts, getChart, children, ...rest } = this.props;
    const notEventProps = getNonEventHandlerProps(rest);
    const chart = getChart();

    this.updateChart({
      ...notEventProps
    });

    addEventHandlersManually(getHighcharts(), chart.object, rest);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateChart(modifiedProps);
    }
  }

  updateChart = config => {
    const chart = this.props.getChart();
    chart.update({
      chart: config
    }, true);
  }

  render () {
    return null;
  }
}

export default Chart;
