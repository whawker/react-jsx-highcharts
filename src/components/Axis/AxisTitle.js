import { Component } from 'react';
import PropTypes from 'prop-types';
import getModifiedProps from '../../utils/getModifiedProps';

class AxisTitle extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    axisId: PropTypes.string
  };

  constructor (props, context) {
    super(props, context);

    this.getAxis = this.getAxis.bind(this);
    this.updateAxisTitle = this.updateAxisTitle.bind(this);
  }

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
    this.updateAxisTitle({
      text: null
    });
  }

  getAxis () {
    return this.context.chart.get(this.props.axisId);
  }

  updateAxisTitle (config) {
    const { axisId, dimension, ...rest } = config;
    this.getAxis().update({
      title: rest
    }, true);
  }

  render () {
    return null;
  }
}

export default AxisTitle;
