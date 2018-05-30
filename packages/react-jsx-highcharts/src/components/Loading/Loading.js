import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import getModifiedProps from '../../utils/getModifiedProps';

class Loading extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    hideDuration: PropTypes.number,
    labelStyle: PropTypes.object,
    showDuration: PropTypes.number,
    style: PropTypes.object,
    getChart: PropTypes.func // Provided by ChartProvider
  };

  static defaultProps = {
    isLoading: true
  };

  componentDidMount () {
    const { children, isLoading, getChart, ...rest } = this.props;
    this.updateLoading(rest);
    if (isLoading) {
      const chart = getChart();
      chart.showLoading(children);
    }
  }

  componentDidUpdate (prevProps) {
    const { children, isLoading, getChart, ...rest } = this.props;
    const modifiedProps = getModifiedProps(prevProps, rest);

    if (modifiedProps !== false) {
      this.updateLoading(modifiedProps);
    }
    if (isLoading !== prevProps.isLoading) {
      const chart = getChart();
      if (isLoading) chart.showLoading(children);
      if (!isLoading) chart.hideLoading();
    }
  }

  componentWillUnmount () {
    const chart = this.props.getChart();
    attempt(chart.hideLoading);
  }

  updateLoading = config => {
    const chart = this.props.getChart();
    chart.update({
      loading: config
    }, true);
  }

  render () {
    return null
  }
}

export default Loading;
