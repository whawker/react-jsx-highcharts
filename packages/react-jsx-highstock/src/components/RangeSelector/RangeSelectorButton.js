import { Component } from 'react';
import PropTypes from 'prop-types';

class RangeSelectorButton extends Component {

  static propTypes = {
    count: PropTypes.number,
    type: PropTypes.string.isRequired,
    update: PropTypes.func, // Provided by ChartProvider
    getChart: PropTypes.func // Provided by ChartProvider
  };

  constructor (props) {
    super(props);
    this.getButtons = this.getButtons.bind(this);
    this.getButtonIndex = this.getButtonIndex.bind(this);
    this.updateRangeSelectorButtons = this.updateRangeSelectorButtons.bind(this);
  }

  componentDidMount () {
    const button = this.getButtonIndex();
    if (!button) {
      const { count, type, children } = this.props;
      const buttons = this.getButtons();
      buttons.push({
        count,
        type,
        text: children
      });
      this.updateRangeSelectorButtons(buttons);
    }
  }

  componentWillUnmount () {
    const button = this.getButtonIndex();
    if (button) {
      const buttons = this.getButtons();
      buttons.splice(button, 1);
      this.updateRangeSelectorButtons(buttons);
    }
  }

  getButtons () {
    const chart = this.props.getChart()
    if (chart && chart.options) {
        const { buttons = [] } = chart.options.rangeSelector;
        return buttons;
    }

    return [];
  }

  getButtonIndex () {
    const { count, type } = this.props;
    this.getButtons().findIndex(b => {
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
