import React, { Component } from 'react';
import PropTypes from 'prop-types';
import memoizeOne from 'memoize-one';
import HighchartsChart from '../HighchartsChart';
import Chart from '../Chart';
import XAxis from '../XAxis';
import YAxis from '../YAxis';
import Hidden from '../Hidden';

const defaultSparklinePlotOptions = {
  series: {
    animation: false,
    lineWidth: 1,
    shadow: false,
    states: {
      hover: {
        lineWidth: 1
      }
    },
    marker: {
      radius: 1,
      states: {
        hover: {
          radius: 2
        }
      }
    },
    fillOpacity: 0.25
  }
};

const EMPTY_ARRAY = [];
const ZERO_ARRAY = [0];
const LABELS_DISABLED = { enabled: false };

class HighchartsSparkline extends Component {

  static propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    margin: PropTypes.array.isRequired,
    style: PropTypes.object.isRequired,
    plotOptions: PropTypes.object.isRequired,
    series: PropTypes.node,
    children: PropTypes.node.isRequired
  };

  static defaultProps = {
    height: 20,
    width: 120,
    margin: [2, 0, 2, 0],
    style: {},
    plotOptions: defaultSparklinePlotOptions
  };

  getChartStyle = memoizeOne((style) => {
    return { overflow: 'visible', ...style };
  })

  render () {
    const { height, width, margin, style, series, children, ...rest } = this.props;
    const hasSeriesProp = !!series;
    const chartStyle = this.getChartStyle(style);
    // If you want to use functionality like Tooltips, pass the data component on the `series` prop
    const Series = hasSeriesProp ? series : children;


    return (
      <HighchartsChart {...rest}>
        <Chart
          height={height}
          width={width}
          animation={false}
          backgroundColor={null}
          borderWidth={0}
          margin={margin}
          style={chartStyle}
          skipClone />

        <XAxis labels={LABELS_DISABLED} startOnTick={false} endOnTick={false} tickPositions={EMPTY_ARRAY} />

        <YAxis id="sparkline" labels={LABELS_DISABLED} startOnTick={false} endOnTick={false} tickPositions={ZERO_ARRAY}>
          {Series}
        </YAxis>

        {hasSeriesProp && (
          <Hidden>
            {children}
          </Hidden>
        )}
      </HighchartsChart>
    );
  }
}

export default HighchartsSparkline;
