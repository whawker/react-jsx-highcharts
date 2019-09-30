import PropTypes from 'prop-types';

export const validChartTypes = PropTypes.oneOf(['chart', 'stockChart']);

export const validAxisTypes = PropTypes.oneOf([
  'category',
  'linear',
  'logarithmic',
  'datetime'
]);
