import { Component } from 'react';
import PropTypes from 'prop-types';

class PlotBandLabel extends Component {

  static propTypes = {
    axisId: PropTypes.string,
    id: PropTypes.string,
    addPlotBand: PropTypes.func, // Provided by AxisProvider
    removePlotBand: PropTypes.func // Provided by AxisProvider
  };

  constructor (props) {
    super(props);

    this.updatePlotBand = this.updatePlotBand.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePlotBand({
      label: {
        text: children
      },
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    this.updatePlotBand({
      label: {
        text: null
      },
      ...rest
    });
  }

  updatePlotBand (config) {
    const { id, addPlotBand, removePlotBand } = this.props;
    removePlotBand(id);
    addPlotBand(config);
  }

  render () {
    return null;
  }
}

export default PlotBandLabel;
