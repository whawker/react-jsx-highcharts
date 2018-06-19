import { Component } from 'react';
import PropTypes from 'prop-types';
import attempt from 'lodash/attempt';
import getModifiedProps from '../../utils/getModifiedProps';

class Pane extends Component {

  static propTypes = {
    getChart: PropTypes.func.isRequired // Provided by ChartProvider
  };

  static defaultProps = {
    children: null
  };

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePane({
      ...rest
    });
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updatePane(modifiedProps);
    }
  }

  componentWillUnmount () {
    attempt(this.updatePane, {});
  }

  updatePane = config => {
    const chart = this.props.getChart();
    chart.update({
      pane: config
    }, true);
  }

  render () {
    return null;
  }
}

export default Pane;
