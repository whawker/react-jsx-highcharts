import { Component } from 'react';
import PropTypes from 'prop-types';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

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
    update: PropTypes.func, // Provided by ChartProvider
    getChart: PropTypes.func // Provided by ChartProvider
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

  constructor (props) {
    super(props);

    this.updateChart = this.updateChart.bind(this);
  }

  componentDidMount () {
    const { type, children, update, getChart, ...rest } = this.props;

    const notEventProps = getNonEventHandlerProps(rest);
    this.updateChart({
      type,
      ...notEventProps
    });

    addEventProps(getChart(), rest);
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateChart(modifiedProps);
    }
  }

  updateChart (config) {
    this.props.update({
      chart: config
    }, true);
  }

  render () {
    return null;
  }
}

export default Chart;
