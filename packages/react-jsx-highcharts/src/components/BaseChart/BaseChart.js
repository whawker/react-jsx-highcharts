import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import debounce from '../../utils/debounce-raf';
import { isEqual, attempt } from 'lodash-es'
import { Provider } from '../ChartContext';
import { validChartTypes } from '../../utils/propTypeValidators'
import clean from '../../utils/removeProvidedProps';

class BaseChart extends Component {

  static defaultProps = {
    children: null,
    className: '',
    styledMode: false,
    callback: () => {}
  };

  static propTypes = {
    chartCreationFunc: PropTypes.func.isRequired,
    chartType: validChartTypes.isRequired,
    callback: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    // Need to wait for CSS to be applied to parent nodes, or chart is rendered at wrong size
    window.requestAnimationFrame(this.initHighcharts);
  }

  initHighcharts = () => {
    if (!this.domNode) {
      return;
    }

    const { chartCreationFunc, callback, chart, polar, gauge, styledMode, children, ...rest } = this.props;

    const opts = {
      chart: {
        styledMode,
        ...chart,
      },
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

    this.chart.polar = polar;
    this.chart.angular = gauge;

    callback(this.chart);

    this.setState({
      rendered: true
    })
  }

  setDomNode = (node) => {
    this.domNode = node;
  }

  componentDidUpdate (prevProps) {
    const { plotOptions } = this.props;
    if (isEqual(prevProps.plotOptions, plotOptions) === false && this.chart) {
      this.chart.update({ plotOptions }, false);
      this.needsRedraw();
    }
  }

  componentWillUnmount () {
    if (this.chart) { // Fixes #14
      window.requestAnimationFrame(this.chart.destroy.bind(this.chart));
      this.chart.__destroyed = true;
    }
  }

  needsRedraw = debounce(() => {
    if(!this.chart.__destroyed) {
      attempt(this.chart.redraw.bind(this.chart));
    }
  });

  getProviderValue = memoizeOne((chart, chartType, needsRedraw ) => {
    const getChart = () => ({
      object: chart,
      type: chartType,
      get: chart.get.bind(chart),
      setSize: chart.setSize.bind(chart),
      update: clean(chart.update.bind(chart)),
      addAxis: clean(chart.addAxis.bind(chart)),
      addSeries: clean(chart.addSeries.bind(chart)),
      setTitle: clean(chart.setTitle.bind(chart)),
      setCaption: chart.setCaption ? clean(chart.setCaption.bind(chart)) : null,
      showLoading: chart.showLoading.bind(chart),
      hideLoading: chart.hideLoading.bind(chart),
      addCredits: clean(chart.addCredits.bind(chart)),
      addAnnotation: chart.addAnnotation ? clean(chart.addAnnotation.bind(chart)) : null,
      removeAnnotation: chart.removeAnnotation ? chart.removeAnnotation.bind(chart) : null
    });

    return { chart, chartType, getChart, needsRedraw };
  })

  render () {
    const { children, chartType } = this.props;

    return (
      <div
        className={`chart ${this.props.className}`}
        ref={ this.setDomNode }>
        {this.state.rendered && (
          <Provider value={this.getProviderValue(this.chart, chartType, this.needsRedraw)}>
            {children}
          </Provider>
        )}
      </div>
    );
  }
}

export default BaseChart;
