import { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';
import { validSeriesTypes } from '../../utils/propTypeValidators';

class Series extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    type: validSeriesTypes.isRequired,
    axisId: PropTypes.string, // Provided by Axis component
    dimension: PropTypes.string, // Provided by Axis component
    data: PropTypes.array,
    visible: PropTypes.bool,
    addSeries: PropTypes.func, // Provided by ChartProvider
    update: PropTypes.func, // Provided by SeriesProvider
    remove: PropTypes.func, // Provided by SeriesProvider
    setData: PropTypes.func, // Provided by SeriesProvider
    setVisible: PropTypes.func // Provided by SeriesProvider
  };

  static defaultProps = {
    type: 'line',
    data: [],
    visible: true
  };

  componentWillMount () {
    const { children, dimension, axisId, addSeries, ...rest } = this.props;
    const nonEventProps = getNonEventHandlerProps(rest);
    addSeries({
      [`${dimension}Axis`]: axisId,
      ...nonEventProps
    }, true);
  }

  componentDidMount () {
    const { getSeries, ...rest } = this.props;
    addEventProps(getSeries(), rest);
  }

  componentDidUpdate (prevProps) {
    const { visible, setVisible, data, setData, update, ...rest } = this.props;

    // Using setData is more performant than update
    if (isEqual(data, prevProps.data) === false) {
      setData(data, true);
    }
    if (visible !== prevProps.visible) {
      setVisible(visible);
    }

    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      update(modifiedProps);
    }
  }

  componentWillUnmount () {
    const { remove } = this.props;

    remove && remove();
  }

  render () {
    const { children } = this.props;
    return (children && this.props.seriesAdded) ? children : null;
  }
}

export default Series;
