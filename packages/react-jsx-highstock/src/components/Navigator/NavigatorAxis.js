import React, { Component, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Hidden, provideAxis, getModifiedProps, getNonEventHandlerProps } from 'react-jsx-highcharts';

class NavigatorAxis extends Component {
  static propTypes = {
    axisId: PropTypes.string.isRequired
  };

  componentDidMount () {
    const { children, ...rest } = this.props;
    this.updateNavigatorAxis(getNonEventHandlerProps(rest));
  }

  componentDidUpdate (prevProps) {
    const modifiedProps = getModifiedProps(prevProps, this.props);
    if (modifiedProps !== false) {
      this.updateNavigatorAxis(modifiedProps);
    }
  }

  updateNavigatorAxis = config => {
    const axis = this.props.getAxis();
    axis.update(config);
  }

  render () {
    const { axisId, children } = this.props;
    if (!children) return null;

    const axisChildren = Children.map(children, child => {
      if (isValidElement(child) === false) return child;
      return cloneElement(child, { axisId });
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
