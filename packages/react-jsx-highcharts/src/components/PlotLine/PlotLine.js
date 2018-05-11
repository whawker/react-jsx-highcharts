import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import attempt from 'lodash/attempt';
import Hidden from '../Hidden';

class PlotLine extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    xAxis: PropTypes.string,
    yAxis: PropTypes.string,
    color: PropTypes.string,
    getAxis: PropTypes.func // Provided by AxisProvider
  };

  static defaultProps = {
    id: uuid()
  };

  constructor (props) {
    super(props);

    this.state = {
      rendered: false
    };
  }

  componentDidMount () {
    const { getAxis, children, ...rest } = this.props;
    const axis = getAxis();
    axis.addPlotLine(rest);
    this.setState({
      rendered: true
    });
  }

  componentDidUpdate (prevProps) {
    const { getAxis, children, ...rest } = this.props;
    const axis = getAxis();
    axis.removePlotLine(prevProps.id);
    axis.addPlotLine(rest);
  }

  componentWillUnmount () {
    const axis = this.props.getAxis();
    attempt(axis.removePlotLine, this.props.id);
  }

  render () {
    const { children, ...rest } = this.props;
    if (!children || !this.state.rendered) return null;

    const lineChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, rest);
    });

    return (
      <Hidden>
        {lineChildren}
      </Hidden>
    );
  }
}

export default PlotLine;
