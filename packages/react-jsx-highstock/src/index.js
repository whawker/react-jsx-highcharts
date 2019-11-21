import { withSeriesType } from 'react-jsx-highcharts';
export * from 'react-jsx-highcharts';

// Charts
export { default as HighchartsStockChart } from './components/HighchartsStockChart';

// Graph parts
export { default as Navigator } from './components/Navigator';
export { default as RangeSelector } from './components/RangeSelector';
export { default as Scrollbar } from './components/Scrollbar';

// Series
export const CandlestickSeries = withSeriesType('Candlestick');
export const FlagsSeries = withSeriesType('Flags');
export const OHLCSeries = withSeriesType('OHLC');
