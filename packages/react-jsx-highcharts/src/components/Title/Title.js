import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import getModifiedProps from '../../utils/getModifiedProps';

class Title extends Component {

  static propTypes = {
    getChart: PropTypes.func // Provided by ChartProvider
  };

  componentDidMount () {
    const { children: text, ...rest } = this.props;
    this.updateTitle({
      ...rest,
      text
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateTitle(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateTitle, { text: null });
  }

  updateTitle = config => {
    const chart = this.props.getChart();
    chart.setTitle(config, null, true);
  }

  render () {
    return null
  }
}

export default Title;
