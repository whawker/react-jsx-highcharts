import { Component } from 'react';
import PropTypes from 'prop-types';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';

class Chart extends Component {

  static propTypes = {
    type: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    addSeries: PropTypes.func,
    onAfterPrint: PropTypes.func,
    onBeforePrint: PropTypes.func,
    onClick: PropTypes.func,
    onLoad: PropTypes.func,
    onRedraw: PropTypes.func,
    onRender: PropTypes.func,
    onSelection: PropTypes.func,
    update: PropTypes.func,
    getChart: PropTypes.func, // Provided by ChartProvider
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  static defaultProps = {
    type: 'line',
    onAfterPrint: () => {},
    onBeforePrint: () => {},
    onClick: () => {},
    onLoad: () => {},
    onRedraw: () => {},
    onRender: () => {},
    onSelection: () => {}
  };

  componentDidMount () {
    const { type, children, update, getHighcharts, getChart, ...rest } = this.props;

    const notEventProps = getNonEventHandlerProps(rest);
    update({
      chart: {
        type,
        ...notEventProps
      }
    });

    addEventProps(getHighcharts(), getChart(), rest);
  }

  render () {
    return null;
  }
}

export default Chart;
