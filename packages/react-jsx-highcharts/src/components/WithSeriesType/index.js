import * as React from 'react';
import PropTypes from 'prop-types';
import Series from '../Series';

// This HOC returns Series component with injected type
export default function withSeriesType(
  seriesType,
  additionalProps = {},
  additionalPropTypes = {}
) {
  const SeriesComponent = props => (
    <Series {...props} {...additionalProps} type={seriesType.toLowerCase()} />
  );

  SeriesComponent.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    ...additionalPropTypes
  };

  SeriesComponent.displayName = `${seriesType}Series`;

  return SeriesComponent;
}
