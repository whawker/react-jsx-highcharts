import React from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

// This HOC returns Series component with injected type
export default function withSeriesType(seriesType, componentName, opts = {}) {
  const { additionalProps, additionalPropTypes } = opts;

  const SeriesComponent = props => (
    <Series {...props} {...additionalProps} type={seriesType} />
  )

  SeriesComponent.propTypes = {
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.func ]),
    ...additionalPropTypes
  };

  SeriesComponent.displayName = componentName;

  return SeriesComponent;
}
