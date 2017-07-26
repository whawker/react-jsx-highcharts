import { Component } from 'react';
import PropTypes from 'prop-types';

class NavigatorSeries extends Component {

  static propTypes = {
    seriesId: PropTypes.string.isRequired,
    update: PropTypes.func // Provided by ChartProvider
  };

  componentDidMount () {
    this.props.update({ showInNavigator: true });
  }

  componentWillUnmount () {
    this.props.update({ showInNavigator: false });
  }

  render () {
    return null;
  }
}

export default NavigatorSeries;
