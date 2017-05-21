import { Component } from 'react';
import PropTypes from 'prop-types';

class PlotBandLabel extends Component {

  static contextTypes = {
    chart: PropTypes.object
  };

  static propTypes = {
    axisId: PropTypes.string,
    id: PropTypes.string
  };

  constructor (props, context) {
    super(props, context);

    this.getAxis = this.getAxis.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    const axis = this.getAxis();
    // Plot bands have no update method
    axis.removePlotBand(this.props.id);
    axis.addPlotBand({
      label: {
        text: children
      },
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    const axis = this.getAxis();
    axis.removePlotBand(this.props.id);
    axis.addPlotBand({
      label: {
        text: null
      },
      ...rest
    });
  }

  getAxis () {
    return this.context.chart.get(this.props.axisId);
  }

  render () {
    return null;
  }
}

export default PlotBandLabel;
