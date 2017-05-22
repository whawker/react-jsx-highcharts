import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Highcharts from 'highstock-release';
import { validChartTypes } from '../../utils/propTypeValidators';

class BaseChart extends Component {

  static childContextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    chartType: validChartTypes.isRequired
  };

  static defaultProps = {
    chartType: 'chart'
  };

  constructor (props, context) {
    super(props, context);

    this.initHighcharts = this.initHighcharts.bind(this);
    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    // Need to wait for CSS to be applied to parent nodes, or chart is rendered at wrong size
    window.setTimeout(this.initHighcharts, 0);
  }

  initHighcharts () {
    if (!this.domNode) {
      return;
    }

    const { chartType,  ...rest } = this.props;

    const opts = {
      chart: {},
      rangeSelector: {
        enabled: false
      },
      navigator: {
        enabled: false
      },
      scrollbar: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [],
      yAxis: [],
      ...rest
    };
    window.chart = this.chart = Highcharts[chartType](this.domNode, opts);

    // Need an initial X axis to later (possibly) display Navigator
    this.chart.xAxis[0].remove(false);

    this.setState({
      rendered: true
    })
  }

  getChildContext() {
    return { chart: this.chart };
  }

  render () {
    return (
      <div
        className="chart"
        ref={(node) => { this.domNode = node }}>
        {this.state.rendered && this.props.children}
      </div>
    );
  }
}

export default BaseChart;
