import * as React from 'react';
import NavigatorAxis from './NavigatorAxis';

import type { NavigatorXAxisOptions } from 'highcharts';
import type { ReactNode } from 'react';

type NavigatorXAxisProps = {
  children?: ReactNode;
} & Partial<NavigatorXAxisOptions>;

const NavigatorXAxis = (props: NavigatorXAxisProps) => (
  <NavigatorAxis {...props} axisId="navigator-x-axis" />
);

export default NavigatorXAxis;
