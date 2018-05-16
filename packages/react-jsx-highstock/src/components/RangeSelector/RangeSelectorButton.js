import { Component } from 'react';
import PropTypes from 'prop-types';
import findIndex from 'lodash/findIndex';
import { getEventsConfig } from 'react-jsx-highcharts';

class RangeSelectorButton extends Component {

  static propTypes = {
    count: PropTypes.number,
    type: PropTypes.oneOf(['millisecond', 'second', 'minute', 'hour', 'day', 'week', 'month', 'ytd', 'all']),
    offsetMin: PropTypes.number.isRequired,
    offsetMax: PropTypes.number.isRequired,
    dataGrouping: PropTypes.object,
    getChart: PropTypes.func // Provided by ChartProvider
  };

  static defaultProps = {
    count: 1,
    offsetMin: 0,
    offsetMax: 0
  };

  componentDidMount () {
    const button = this.getButtonIndex();
    if (button > -1) return; // Button already present

    const { count, type, offsetMin, offsetMax, dataGrouping, children: text, ...rest } = this.props;

    // Add button to array
    const buttons = [
      ...this.getButtons(),
      {
        count,
        type,
        offsetMin,
        offsetMax,
        dataGrouping,
        text,
        events: getEventsConfig(rest)
      }
    ];
    this.updateRangeSelectorButtons(buttons);
  }

  componentWillUnmount () {
    const button = this.getButtonIndex();
    if (button === -1) return;

    // Remove button from array
    const buttons = [...this.getButtons()];
    buttons.splice(button, 1);
    this.updateRangeSelectorButtons(buttons);
  }

  getButtons = () => {
    const chartObj = this.props.getChart().object;
    if (chartObj && chartObj.options) {
      const { buttons = [] } = chartObj.options.rangeSelector;
      return buttons;
    }

    return [];
  }

  getButtonIndex = () => {
    const { count, type } = this.props;
    return findIndex(this.getButtons(), b => {
      return (b.count === count && b.type === type);
    });
  }

  updateRangeSelectorButtons = config => {
    const chart = this.props.getChart();
    chart.update({
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
