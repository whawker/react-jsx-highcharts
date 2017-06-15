import { Component } from 'react';
import PropTypes from 'prop-types';
import getModifiedProps from '../../utils/getModifiedProps';

class LegendTitle extends Component {

  static propTypes = {
    update: PropTypes.func // Provided by ChartProvider
  };

  constructor (props) {
    super(props);

    this.updateLegendTitle = this.updateLegendTitle.bind(this);
  }

  componentDidMount () {
    const { children: text, ...rest } = this.props;
    this.updateLegendTitle({
      ...rest,
      text
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props, true);
    if (modifiedProps !== false) {
      this.updateLegendTitle(modifiedProps);
    }
  }

  componentWillUnmount () {
    this.updateLegendTitle({
      text: null
    });
  }

  updateLegendTitle (config) {
    this.props.update({
      legend: {
        title: config
      }
    }, true);
  }

  render () {
    return null;
  }
}

export default LegendTitle;
