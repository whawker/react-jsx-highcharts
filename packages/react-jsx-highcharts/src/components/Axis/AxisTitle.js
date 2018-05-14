import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import getModifiedProps from '../../utils/getModifiedProps';

class AxisTitle extends Component {

  static propTypes = {
    getAxis: PropTypes.func // Provided by AxisProvider
  };

  componentDidMount () {
    const { children: text, ...rest } = this.props; // eslint-disable-line no-unused-vars
    this.updateAxisTitle({
      ...rest,
      text
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateAxisTitle(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updateAxisTitle, { text: null });
  }

  updateAxisTitle = config => {
    const axis = this.props.getAxis();
    axis.setTitle(config, true);
  }

  render () {
    return null;
  }
}

export default AxisTitle;
