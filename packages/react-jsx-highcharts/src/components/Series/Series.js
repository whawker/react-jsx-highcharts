import { Component } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import isImmutable from 'is-immutable';
import immutableEqual from 'immutable-is';
import addEventProps, { getNonEventHandlerProps } from '../../utils/events';
import getModifiedProps from '../../utils/getModifiedProps';

class Series extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    axisId: PropTypes.string, // Provided by Axis component
    dimension: PropTypes.string, // Provided by Axis component
    data: PropTypes.any,
    visible: PropTypes.bool,
    addSeries: PropTypes.func, // Provided by ChartProvider
    update: PropTypes.func, // Provided by SeriesProvider
    remove: PropTypes.func, // Provided by SeriesProvider
    setData: PropTypes.func, // Provided by SeriesProvider
    setVisible: PropTypes.func, // Provided by SeriesProvider
    getSeries: PropTypes.func, // Provided by SeriesProvider
    getHighcharts: PropTypes.func.isRequired // Provided by HighchartsProvider
  };

  static defaultProps = {
    type: 'line',
    data: [],
    visible: true
  };

  componentWillMount () {
    const { children, dimension, axisId, addSeries, data, ...rest } = this.props;
    const seriesData = isImmutable(data) ? data.toJS() : data;
    const nonEventProps = getNonEventHandlerProps(rest);

    addSeries({
      [`${dimension}Axis`]: axisId,
      data: seriesData,
      ...nonEventProps
    }, true);
  }

  componentDidMount () {
    const { update, ...rest } = this.props;
    addEventProps(update, rest);
  }

  componentDidUpdate (prevProps) {
    const { visible, setVisible, data, setData, update, ...rest } = this.props;

    // Using setData is more performant than update
    if (isImmutable(data) && immutableEqual(data, prevProps.data) === false) {
      setData(data.toJS(), true);
    } else if (isEqual(data, prevProps.data) === false) {
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
    if (this.props.getSeries()) {
      this.props.remove(); // Series may have already been removed, i.e. when Axis unmounted
    }
  }

  render () {
    const { children } = this.props;
    return (children && this.props.seriesAdded) ? children : null;
  }
}

export default Series;
