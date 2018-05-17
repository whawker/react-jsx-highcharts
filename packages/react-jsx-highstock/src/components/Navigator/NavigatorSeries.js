import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';

class NavigatorSeries extends Component {

  static propTypes = {
    seriesId: PropTypes.string.isRequired,
    getSeries: PropTypes.func // Provided by SeriesProvider
  };

  componentDidMount () {
    this.updateNavigatorSeries({ showInNavigator: true });
  }

  componentWillUnmount () {
    attempt(this.updateNavigatorSeries, { showInNavigator: false });
  }

  updateNavigatorSeries = config => {
    const series = this.props.getSeries();
    series.update(config);
  }

  render () {
    return null;
  }
}

export default NavigatorSeries;
