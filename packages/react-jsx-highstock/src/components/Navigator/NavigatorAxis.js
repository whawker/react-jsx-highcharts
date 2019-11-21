import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useChart, useModifiedProps } from 'react-jsx-highcharts';
import AxisContext from 'react-jsx-highcharts/dist/es/components/AxisContext';
import createProvidedAxis from 'react-jsx-highcharts/dist/es/components/Axis/createProvidedAxis';

const NavigatorAxis = ({ children, axisType, axisId, ...restProps }) => {
  const chart = useChart();
  const modifiedProps = useModifiedProps(restProps);
  const providedAxisRef = useRef(null);

  if (modifiedProps !== false) {
    const config = {
      navigator: {}
    };
    config.navigator[axisType] = modifiedProps;
    chart.update(config);
  }

  if (!children) return null;

  const axis = chart.get(axisId);
  if (!providedAxisRef.current || axis !== providedAxisRef.current.object) {
    providedAxisRef.current = createProvidedAxis(axis);
  }

  return (
    <AxisContext.Provider value={providedAxisRef.current}>
      {children}
    </AxisContext.Provider>
  );
};

NavigatorAxis.propTypes = {
  axisId: PropTypes.string.isRequired,
  axisType: PropTypes.string.isRequired
};
export default NavigatorAxis;
