import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import getModifiedProps from '../../utils/getModifiedProps';

class LegendTitle extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired, // Provided by ChartProvider
  };

  componentDidMount () {
    const { children: text, ...rest } = this.props;
    this.updateLegendTitle({
      ...rest,
      text
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateLegendTitle(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateLegendTitle, { text: null });
  }

  updateLegendTitle = config => {
    const chart = this.props.getChart();
    chart.update({
      legend: {
        title: config
      }
    }, true);
  }

  render () {
    return null;
  }
}

export default LegendTitle;
