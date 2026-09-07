import NavigatorAxis from './NavigatorAxis.tsx';

import type { NavigatorYAxisOptions } from 'highcharts';
import type { ReactNode } from 'react';

type NavigatorYAxisProps = {
  children?: ReactNode;
} & Partial<NavigatorYAxisOptions>;

const NavigatorYAxis = (props: NavigatorYAxisProps) => (
  <NavigatorAxis {...props} axisId="navigator-y-axis" />
);

export default NavigatorYAxis;
