import { Component } from 'react';
import PropTypes from 'prop-types';
import { pickBy } from 'lodash-es';
import { attempt } from 'lodash-es';
import { find } from 'lodash-es';
import getModifiedProps from '../../utils/getModifiedProps';

class PlotBandLabel extends Component {

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
    this.updatePlotBandLabel({
      text,
      ...rest
    });
  }

  componentDidUpdate (prevProps) {
    if (getModifiedProps(prevProps, this.props, true) === false) return;

    const { children: text, ...rest } = this.props;
    this.updatePlotBandLabel({
      text,
      ...rest
    });
  }

  componentWillUnmount () {
    const { children, ...rest } = this.props;
    attempt(
      this.updatePlotBandLabel,
      {
        text: null,
        ...rest
      }
    );
  }

  getLabelProps = props => {
    return pickBy(props, (value, propName) => {
      return PlotBandLabel.labelProps.indexOf(propName) > -1;
    });
  }

  updatePlotBandLabel = config => {
    const { id, getAxis } = this.props;
    const axis = getAxis();

    window.requestAnimationFrame(() => {
      const plotBand = axis.object && find(axis.object.plotLinesAndBands, band => band.id === id);
      if (plotBand) {
        plotBand.options.label = this.getLabelProps(config);
        plotBand.render();
      }
    });
  }

  render () {
    return null;
  }
}

export default PlotBandLabel;
