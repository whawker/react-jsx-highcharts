import { Component } from 'react';
import PropTypes from 'prop-types';
import pickBy from 'lodash/pickBy';
import attempt from 'lodash/attempt';
import find from 'lodash/find';
import getModifiedProps from '../../utils/getModifiedProps';

class PlotLineLabel extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
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

  componentDidMount () {
    const { children: text, ...rest } = this.props;
    this.updatePlotLineLabel({
      text,
      ...rest
    });
  }

  componentDidUpdate (prevProps) {
    if (getModifiedProps(prevProps, this.props, true) === false) return;

    const { children: text, ...rest } = this.props;
    this.updatePlotLineLabel({
      text,
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    attempt(
      this.updatePlotLineLabel,
      {
        text: null,
        ...rest
      }
    );
  }

  getLabelProps = props => {
    return pickBy(props, (value, propName) => {
      return PlotLineLabel.labelProps.indexOf(propName) > -1;
    });
  }

  updatePlotLineLabel = config => {
    const { id, getAxis } = this.props;
    const axis = getAxis();

    window.setTimeout(() => {
      const plotLine = axis.object && find(axis.object.plotLinesAndBands, line => line.id === id);
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
