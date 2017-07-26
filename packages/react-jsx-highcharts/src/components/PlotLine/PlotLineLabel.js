import { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';

class PlotLineLabel extends Component {

  static propTypes = {
    axisId: PropTypes.string,
    id: PropTypes.string,
    addPlotLine: PropTypes.func, // Provided by AxisProvider
    removePlotLine: PropTypes.func // Provided by AxisProvider
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

    this.updatePlotLine = this.updatePlotLine.bind(this);
    this.getLabelProps = this.getLabelProps.bind(this);
    this.getOtherProps = this.getOtherProps.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePlotLine({
      text: children,
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    this.updatePlotLine({
      text: null,
      ...rest
    });
  }

  getLabelProps (props) {
    return pickBy(props, (value, propName) => {
      return PlotLineLabel.labelProps.indexOf(propName) > -1;
    });
  }

  getOtherProps (props) {
    return pickBy(props, (value, propName) => {
      return PlotLineLabel.labelProps.indexOf(propName) === -1;
    });
  }

  updatePlotLine (config) {
    const { id, addPlotLine, removePlotLine } = this.props;
    const labelProps = this.getLabelProps(config);
    const otherProps = this.getOtherProps(config);
    removePlotLine(id);
    addPlotLine({
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

export default PlotLineLabel;
