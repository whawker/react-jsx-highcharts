import { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';

class PlotBandLabel extends Component {

  static propTypes = {
    axisId: PropTypes.string,
    id: PropTypes.string,
    addPlotBand: PropTypes.func, // Provided by AxisProvider
    removePlotBand: PropTypes.func // Provided by AxisProvider
  };

  static labelProps = [
    'text',
    'align',
    'rotation',
    'style',
    'textAlign',
    'useHTML',
    'verticalAlign',
    'x',
    'y'
  ];

  constructor (props) {
    super(props);

    this.updatePlotBand = this.updatePlotBand.bind(this);
    this.getLabelProps = this.getLabelProps.bind(this);
    this.getOtherProps = this.getOtherProps.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePlotBand({
      text: children,
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    this.updatePlotBand({
      text: null,
      ...rest
    });
  }

  getLabelProps (props) {
    return pickBy(props, (value, propName) => {
      return PlotBandLabel.labelProps.indexOf(propName) > -1;
    });
  }

  getOtherProps (props) {
    return pickBy(props, (value, propName) => {
      return PlotBandLabel.labelProps.indexOf(propName) === -1;
    });
  }

  updatePlotBand (config) {
    const { id, addPlotBand, removePlotBand } = this.props;
    const labelProps = this.getLabelProps(config);
    const otherProps = this.getOtherProps(config);
    removePlotBand(id);
    addPlotBand({
      ...otherProps,
      label: {
        ...labelProps
      }
    });
  }

  render () {
    return null;
  }
}

export default PlotBandLabel;
