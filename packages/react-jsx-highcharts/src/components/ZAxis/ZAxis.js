import * as React from 'react';
import Axis from '../Axis';

const ZAxis = ({ type = 'linear', ...restProps }) => (
  <Axis type={type} {...restProps} id="zAxis" isX={false} dynamicAxis={false} />
);

ZAxis.displayName = 'ZAxis';
ZAxis.Title = Axis.Title;
export default ZAxis;
