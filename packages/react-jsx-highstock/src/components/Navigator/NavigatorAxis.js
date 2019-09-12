import React, { useEffect, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { Hidden, useAxis, useModifiedProps, getNonEventHandlerProps } from 'react-jsx-highcharts';

const NavigatorAxis = props => {
  const axis = useAxis();

  useEffect(() => {
    const { children, ...rest } = this.props;
    updateNavigatorAxis(getNonEventHandlerProps(rest), axis);
  }, [axis]);

  const modifiedProps = useModifiedProps(props);

  useEffect(() => {
    if (!axis) return;

    if (modifiedProps !== false) {
      updateNavigatorAxis(modifiedProps, axis);
    }
  })


  const { axisId, children } = props;
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
const updateNavigatorAxis = (config, axis) => {
  axis.update(config);
}

NavigatorAxis.propTypes = {
  axisId: PropTypes.string.isRequired
};
export default NavigatorAxis;

