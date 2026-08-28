import * as React from 'react';
import Axis from '../Axis';

import type { ZAxisProps } from '../Axis/Axis';

const ZAxis = ({ type = 'linear', ...restProps }: ZAxisProps) => (
  <Axis type={type} {...restProps} id="zAxis" isX={false} dynamicAxis={false} />
);

ZAxis.displayName = 'ZAxis';
ZAxis.Title = Axis.Title;
export default ZAxis;
