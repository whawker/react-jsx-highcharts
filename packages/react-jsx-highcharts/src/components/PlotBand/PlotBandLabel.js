import { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';

class PlotBandLabel extends Component {

  static propTypes = {
    axisId: PropTypes.string,
    id: PropTypes.string,
    getAxis: PropTypes.func // Provided by AxisProvider
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

    this.updatePlotBandLabel = this.updatePlotBandLabel.bind(this);
    this.getLabelProps = this.getLabelProps.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePlotBandLabel({
      text: children,
      ...rest
    });
  }

  componentDidUpdate () {
    const { children, ...rest } = this.props;
    this.updatePlotBandLabel({
      text: children,
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    this.updatePlotBandLabel({
      text: null,
      ...rest
    });
  }

  getLabelProps (props) {
    return pickBy(props, (value, propName) => {
      return PlotBandLabel.labelProps.indexOf(propName) > -1;
    });
  }

  updatePlotBandLabel (config) {
    const { id, getAxis } = this.props;
    const axis = getAxis();

    window.setTimeout(() => {
      const plotBand = axis && axis.plotLinesAndBands.find(band => band.id === id);
      if (plotBand) {
        plotBand.options.label = this.getLabelProps(config);
        plotBand.render();
      }
    }, 1);
  }

  render () {
    return null;
  }
}

export default PlotBandLabel;
