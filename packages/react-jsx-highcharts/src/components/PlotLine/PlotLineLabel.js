import { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';

class PlotLineLabel extends Component {

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

    this.updatePlotLineLabel = this.updatePlotLineLabel.bind(this);
    this.getLabelProps = this.getLabelProps.bind(this);
  }

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updatePlotLineLabel({
      text: children,
      ...rest
    });
  }

  componentDidUpdate () {
    const { children, ...rest } = this.props;
    this.updatePlotLineLabel({
      text: children,
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    this.updatePlotLineLabel({
      text: null,
      ...rest
    });
  }

  getLabelProps (props) {
    return pickBy(props, (value, propName) => {
      return PlotLineLabel.labelProps.indexOf(propName) > -1;
    });
  }

  updatePlotLineLabel (config) {
    const { id, getAxis } = this.props;
    const axis = getAxis();

    window.setTimeout(() => {
      const plotLine = axis && axis.plotLinesAndBands.find(line => line.id === id);
      if (plotLine) {
        plotLine.options.label = this.getLabelProps(config);
        plotLine.render();
      }
    }, 1);
  }

  render () {
    return null;
  }
}

export default PlotLineLabel;
