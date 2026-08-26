import * as React from 'react';
import Series from '../Series';

// This HOC returns Series component with injected type
export default function withSeriesType(seriesType, additionalProps = {}) {
  const SeriesComponent = props => (
    <Series {...props} {...additionalProps} type={seriesType.toLowerCase()} />
  );

  SeriesComponent.displayName = `${seriesType}Series`;

  return SeriesComponent;
}
