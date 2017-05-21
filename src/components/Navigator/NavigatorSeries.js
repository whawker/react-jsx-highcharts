import { Component } from 'react';
import PropTypes from 'prop-types';

class NavigatorSeries extends Component {

  static propTypes = {
    seriesId: PropTypes.string.isRequired
  };

  static contextTypes = {
    chart: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);

    this.getSeries = this.getSeries.bind(this);
  }

  componentDidMount () {
    const series = this.getSeries();
    series && series.update({ showInNavigator: true });
  }

  componentWillUnmount () {
    const series = this.getSeries();
    series && series.update({ showInNavigator: false });
  }

  getSeries () {
    return this.context.chart.get(this.props.seriesId);
  }

  render () {
    return null;
  }
}

export default NavigatorSeries;
