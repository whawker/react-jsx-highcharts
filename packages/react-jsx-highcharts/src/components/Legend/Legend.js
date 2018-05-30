import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import getModifiedProps from '../../utils/getModifiedProps';

class Legend extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    children: null,
    enabled: true
  };

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateLegend({
      ...rest
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateLegend(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateLegend, { enabled: false });
  }

  updateLegend = config => {
    const chart = this.props.getChart();
    chart.update({
      legend: config
    }, true);
  }

  render () {
    return this.props.children;
  }
}

export default Legend;
