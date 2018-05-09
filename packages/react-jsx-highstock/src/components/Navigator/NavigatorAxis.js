import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Hidden, provideAxis, getModifiedProps, getNonEventHandlerProps } from 'react-jsx-highcharts';

class NavigatorAxis extends Component {
  static propTypes = {
    axisId: PropTypes.string.isRequired
  };

  componentWillMount () {
    const { children, update, ...rest } = this.props;
    update(getNonEventHandlerProps(rest));
  }

  componentDidUpdate (prevProps) {
    const { update, ...rest } = this.props;
    const modifiedProps = getModifiedProps(prevProps, rest);
    if (modifiedProps !== false) {
      update(modifiedProps);
    }
  }

  render () {
    const { dimension, axisId, children } = this.props;
    if (!children) return null;

    const axisChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, { dimension, axisId });
    });

    return (
      <Hidden>
        {axisChildren}
      </Hidden>
    );
  }
}

export default provideAxis(NavigatorAxis);

// For testing purposes
export const _NavigatorAxis = NavigatorAxis;
