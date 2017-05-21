import { Component } from 'react';
import PropTypes from 'prop-types';
import getModifiedProps from '../../utils/getModifiedProps';

class Legend extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);

    this.updateLegend = this.updateLegend.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateLegend({
      ...rest,
      enabled: true
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateLegend(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateLegend({
      enabled: false
    });
  }

  updateLegend (config) {
    this.context.chart.update({
      legend: config
    }, true);
  }

  render () {
    const { children } = this.props;
    return children ? children : null;
  }
}

export default Legend;
