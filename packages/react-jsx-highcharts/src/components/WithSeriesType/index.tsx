import * as React from 'react';
import Series from '../Series';

import type { SeriesProps } from '../Series/Series';

/** This HOC returns Series component with injected type.
 *
 * @private
 */
const withSeriesType = <S,>(
  seriesType: string,
  additionalProps?: Record<string, unknown>
) => {
  const SeriesComponent = (props: SeriesProps<S>) => (
    <Series {...props} {...additionalProps} type={seriesType.toLowerCase()} />
  );

  SeriesComponent.displayName = `${seriesType}Series`;

  return SeriesComponent;
};

export default withSeriesType;
