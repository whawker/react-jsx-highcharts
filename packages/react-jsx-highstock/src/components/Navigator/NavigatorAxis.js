import * as React from 'react';
import {
  useRef,
  useEffect,
  Children,
  cloneElement,
  isValidElement
} from 'react';
import PropTypes from 'prop-types';
import {
  useAxis,
  useModifiedProps,
  getNonEventHandlerProps
} from 'react-jsx-highcharts';

const NavigatorAxis = ({ children, axisId, ...restProps }) => {
  const axis = useAxis(axisId);
  const renderedRef = useRef(false);

  useEffect(() => {
    if (!axis) return;

    updateNavigatorAxis(getNonEventHandlerProps(restProps), axis);
  }, [axis]);

  const modifiedProps = useModifiedProps(restProps);

  useEffect(() => {
    if (!renderedRef.current) {
      // don't update on first render
      renderedRef.current = true;
      return;
    }

    if (!axis) return;

    if (modifiedProps !== false) {
      updateNavigatorAxis(modifiedProps, axis);
    }
  });

  if (!children) return null;

  const axisChildren = Children.map(children, child => {
    if (isValidElement(child) === false) return child;
    return cloneElement(child, { axisId });
  });

  return <>{axisChildren}</>;
};
const updateNavigatorAxis = (config, axis) => {
  axis.update(config);
};

NavigatorAxis.propTypes = {
  axisId: PropTypes.string.isRequired
};
export default NavigatorAxis;
