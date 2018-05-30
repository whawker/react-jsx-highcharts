import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import getModifiedProps from '../../utils/getModifiedProps';

class Credits extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
    enabled: PropTypes.bool.isRequired
  };

  static defaultProps = {
    enabled: true
  };

  componentDidMount () {
    const { children: text, ...rest } = this.props;
    this.updateCredits({
      ...rest,
      text
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateCredits(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateCredits, { enabled: false });
  }

  updateCredits = config => {
    const chart = this.props.getChart();
    chart.update({
      credits: config
    }, true);
  }

  render () {
    return null
  }
}

export default Credits;
