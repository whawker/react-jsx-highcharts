import * as React from 'react';
import PropTypes from 'prop-types';
import Axis from '../Axis';

const YAxis = ({ type = 'linear', ...restProps }) => (
  <Axis type={type} {...restProps} isX={false} />
);

YAxis.propTypes = {
  type: PropTypes.string
};
YAxis.displayName = 'YAxis';

YAxis.Title = Axis.Title;
export default YAxis;
