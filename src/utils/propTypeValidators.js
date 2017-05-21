import PropTypes from 'prop-types';

export const validSeriesTypes = PropTypes.oneOf([
  'area', 'arearange', 'areaspline', 'areasplinerange',
  'bar', 'boxplot', 'bubble', 'candlestick', 'column',
  'columnrange', 'errorbar', 'flags', 'funnel',
  'line', 'ohlc', 'pie', 'polygon', 'pyramid', 'scatter',
  'spline', 'waterfall'
]);

export const validChartTypes = PropTypes.oneOf([
  'chart', 'stockChart'
]);

export const validAxisTypes = PropTypes.oneOf([
  'category', 'linear', 'logarithmic', 'datetime'
]);

export const validAxisDimensions = PropTypes.oneOf([
  'x', 'y'
]);
