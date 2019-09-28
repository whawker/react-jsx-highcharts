import React, { useEffect, Children, cloneElement, isValidElement } from 'react';
import PropTypes from 'prop-types';
import { useAxis, useModifiedProps, getNonEventHandlerProps } from 'react-jsx-highcharts';

const NavigatorAxis = props => {
  const axis = useAxis(props.axisId);

  useEffect(() => {
    if (!axis) return;

    const { children, ...rest } = props;
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
    <>
      {axisChildren}
    </>
  );
}
const updateNavigatorAxis = (config, axis) => {
  axis.update(config);
}

NavigatorAxis.propTypes = {
  axisId: PropTypes.string.isRequired
};
export default NavigatorAxis;

