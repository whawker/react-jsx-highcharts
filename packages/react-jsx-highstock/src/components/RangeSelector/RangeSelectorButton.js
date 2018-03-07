import { Component } from 'react';
import PropTypes from 'prop-types';
import { getEventsConfig } from 'react-jsx-highcharts/src/utils/events';

class RangeSelectorButton extends Component {

  static propTypes = {
    count: PropTypes.number,
    type: PropTypes.oneOf(['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'ytd', 'all']),
    offsetMin: PropTypes.number.isRequired,
    offsetMax: PropTypes.number.isRequired,
    dataGrouping: PropTypes.object,
    update: PropTypes.func, // Provided by ChartProvider
    getChart: PropTypes.func // Provided by ChartProvider
  };

  static defaultProps = {
    count: 1,
    offsetMin: 0,
    offsetMax: 0
  };

  constructor (props) {
    super(props);
    this.getButtons = this.getButtons.bind(this);
    this.getButtonIndex = this.getButtonIndex.bind(this);
    this.updateRangeSelectorButtons = this.updateRangeSelectorButtons.bind(this);
  }

  componentDidMount () {
    const button = this.getButtonIndex();
    if (button > -1) return; // Button already present

    const { count, type, offsetMin, offsetMax, dataGrouping, children, ...rest } = this.props;

    const buttons = [
      ...this.getButtons(),
      {
        count,
        type,
        offsetMin,
        offsetMax,
        dataGrouping,
        text: children,
        events: getEventsConfig(rest)
      }
    ];
    this.updateRangeSelectorButtons(buttons);
  }

  componentWillUnmount () {
    const button = this.getButtonIndex();
    if (button === -1) return;

    const buttons = [...this.getButtons()];
    buttons.splice(button, 1);
    this.updateRangeSelectorButtons(buttons);
  }

  getButtons () {
    const chart = this.props.getChart();
    if (chart && chart.options) {
      const { buttons = [] } = chart.options.rangeSelector;
      return buttons;
    }

    return [];
  }

  getButtonIndex () {
    const { count, type } = this.props;
    return this.getButtons().findIndex(b => {
      return (b.count === count && b.type === type);
    });
  }

  updateRangeSelectorButtons (config) {
    this.props.update({
      rangeSelector: {
        buttons: config
      }
    });
  }

  render () {
    return null;
  }
}

export default RangeSelectorButton;
