import * as React from 'react';
import Axis from '../Axis/index.ts';

import type { ZAxisProps } from '../Axis/Axis.tsx';

const ZAxis = ({ type = 'linear', ...restProps }: ZAxisProps) => (
  <Axis type={type} {...restProps} id="zAxis" isX={false} dynamicAxis={false} />
);

ZAxis.displayName = 'ZAxis';
ZAxis.Title = Axis.Title;
export default ZAxis;
