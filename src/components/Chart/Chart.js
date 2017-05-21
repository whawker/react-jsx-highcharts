import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import omitBy from 'lodash.omitby';
import pickBy from 'lodash.pickby';
import forEach from 'lodash.foreach';
import lowerFirst from 'lodash.lowerfirst'
import { validSeriesTypes } from '../../utils/propTypeValidators';

class Chart extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

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
    onSelection: PropTypes.func
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

  constructor (props, context) {
    super(props, context);

    this.isEventKey = this.isEventKey.bind(this);
  }

  componentDidMount () {
    const { type, children,  ...rest } = this.props;
    const { chart } = this.context;

    const notEventProps = omitBy(rest, this.isEventKey);
    chart.update({
      chart: {
        type,
        ...notEventProps
      }
    });

    const eventProps = pickBy(rest, this.isEventKey);
    forEach(eventProps, (handler, eventName) => {
      const highchartsEventName = lowerFirst(eventName.replace(/^on/, ''));
      Highcharts.addEvent(chart, highchartsEventName, handler);
    });
  }

  isEventKey (value, key) {
    return key.indexOf('on') === 0;
  }

  render () {
    return null;
  }
}

export default Chart;
