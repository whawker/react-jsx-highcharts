import { withSeriesType } from 'react-jsx-highcharts';
export * from 'react-jsx-highcharts';

import type {
  SeriesCandlestickOptions,
  SeriesFlagsOptions,
  SeriesOhlcOptions
} from 'highcharts';

// Charts
export { default as HighchartsStockChart } from './components/HighchartsStockChart/index.ts';

// Graph parts
export { default as Navigator } from './components/Navigator/index.ts';
export { default as RangeSelector } from './components/RangeSelector/index.ts';
export { default as Scrollbar } from './components/Scrollbar/index.ts';

// Series
export const CandlestickSeries =
  withSeriesType<SeriesCandlestickOptions>('Candlestick');
export const FlagsSeries = withSeriesType<SeriesFlagsOptions>('Flags');
export const OHLCSeries = withSeriesType<SeriesOhlcOptions>('OHLC');
