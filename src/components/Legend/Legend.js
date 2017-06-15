import { Component } from 'react';
import getModifiedProps from '../../utils/getModifiedProps';

class Legend extends Component {

  constructor (props) {
    super(props);

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
    this.props.update({
      legend: config
    }, true);
  }

  render () {
    const { children } = this.props;
    return children ? children : null;
  }
}

export default Legend;
