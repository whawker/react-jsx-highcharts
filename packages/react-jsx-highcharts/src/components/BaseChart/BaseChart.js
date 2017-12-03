import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BaseChart extends Component {
  static childContextTypes = {
    chart: PropTypes.object
  };

  static defaultProps = {
    className: '',
    callback: () => {}
  };

  static propTypes = {
    chartCreationFunc: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired
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

    const { chartCreationFunc, callback, ...rest } = this.props;

    const opts = {
      chart: {},
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      legend: {
        enabled: false
      },
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
      xAxis: [],
      yAxis: [],
      ...rest
    };
    this.chart = chartCreationFunc(this.domNode, opts);

    callback(this.chart);

    this.setState({
      rendered: true
    })
  }

  componentWillUnmount () {
    if (this.chart) { // Fixes #14
      window.setTimeout(this.chart.destroy.bind(this.chart), 1);
      this.chart.__destroyed = true;
    }
  }

  getChildContext () {
    return {
      chart: this.chart
    };
  }

  render () {
    return (
      <div
        className={`chart ${this.props.className}`}
        ref={(node) => { this.domNode = node }}>
        {this.state.rendered && this.props.children}
      </div>
    );
  }
}

export default BaseChart;
