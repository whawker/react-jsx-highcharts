import { Component } from 'react';
import PropTypes from 'prop-types';
import getModifiedProps from '../../utils/getModifiedProps';

class Loading extends Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    hideDuration: PropTypes.number,
    labelStyle: PropTypes.object,
    showDuration: PropTypes.number,
    style: PropTypes.object,
    hideLoading: PropTypes.func, // Provided by ChartProvider
    showLoading: PropTypes.func, // Provided by ChartProvider
    update: PropTypes.func // Provided by ChartProvider
  };

  static defaultProps = {
    isLoading: true
  };

  constructor (props) {
    super(props);

    this.updateLoading = this.updateLoading.bind(this);
  }

  componentDidMount () {
    const { children, isLoading, showLoading, ...rest } = this.props;
    this.updateLoading(rest);
    if (isLoading) {
      showLoading(children);
    }
  }

  componentDidUpdate (prevProps) {
    const { children, isLoading, showLoading, hideLoading, ...rest } = this.props;
    const modifiedProps = getModifiedProps(prevProps, rest);

    if (modifiedProps !== false) {
      this.updateLoading(modifiedProps);
    }
    if (isLoading !== prevProps.isLoading) {
      if (isLoading) showLoading(children);
      if (!isLoading) hideLoading();
    }
  }

  componentWillUnmount () {
    this.props.hideLoading();
  }

  updateLoading (config) {
    this.props.update({
      loading: config
    }, true);
  }

  render () {
    return null
  }
}

export default Loading;
