import { Component } from 'react';
import PropTypes from 'prop-types';
import { attempt } from 'lodash-es';
import getModifiedProps from '../../utils/getModifiedProps';

class Subtitle extends Component {

  static propTypes = {
    getChart: PropTypes.func, // Provided by ChartProvider
    needsRedraw: PropTypes.func // Provided by ChartProvider
  };

  componentDidMount () {
    const { children: text, ...rest } = this.props;
    this.updateSubtitle({
      ...rest,
      text
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateSubtitle(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateSubtitle, { text: null });
  }

  updateSubtitle = config => {
    const chart = this.props.getChart();
    chart.setTitle(undefined, config, false);
    this.props.needsRedraw();
  }

  render () {
    return null
  }
}

export default Subtitle;
