import * as React from 'react';
import NavigatorAxis from './NavigatorAxis';

import type { NavigatorYAxisOptions } from 'highcharts';
import type { ReactNode } from 'react';

type NavigatorYAxisProps = {
  children?: ReactNode;
} & Partial<NavigatorYAxisOptions>;

const NavigatorYAxis = (props: NavigatorYAxisProps) => (
  <NavigatorAxis {...props} axisId="navigator-y-axis" />
);

export default NavigatorYAxis;
