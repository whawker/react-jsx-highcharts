import { Component } from 'react';
import PropTypes from 'prop-types';
import { addEventHandlersManually, getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

class Chart extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    width: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    height: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
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
    const { width, height, getHighcharts, getChart, needsRedraw, children, ...rest } = this.props;
    const notEventProps = getNonEventHandlerProps(rest);
    const chart = getChart();

    chart.setSize(width, height);
    this.updateChart(notEventProps);
    addEventHandlersManually(getHighcharts(), chart.object, rest);
  }

  componentDidUpdate (prevProps) {
    const { width, height, getChart, ...rest } = this.props;

    if (width !== prevProps.width || height !== prevProps.height) {
      getChart().setSize(width, height);
    }

    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      this.updateChart(modifiedProps);
    }
  }

  updateChart = config => {
    const chart = this.props.getChart();
    chart.update({
      chart: config
    }, false);
    this.props.needsRedraw();
  }

  render () {
    return null;
  }
}

export default Chart;
