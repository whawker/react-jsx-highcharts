import { Component } from 'react';
import PropTypes from 'prop-types';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import { validSeriesTypes } from '../../utils/propTypeValidators';

class Chart extends Component {

  static propTypes = {
    type: validSeriesTypes.isRequired,
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
    update: PropTypes.func
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
    const { type, children, update, getChart, ...rest } = this.props;

    const notEventProps = getNonEventHandlerProps(rest);
    update({
      chart: {
        type,
        ...notEventProps
      }
    });

    addEventProps(getChart(), rest);
  }

  render () {
    return null;
  }
}

export default Chart;
