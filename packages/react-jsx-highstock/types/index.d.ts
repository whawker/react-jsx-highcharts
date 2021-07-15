import type * as Highcharts from 'highcharts';
import type { ReactElement, ReactNode } from 'react';
import { HighchartsChartProps, SeriesProps } from 'react-jsx-highcharts';

export * from 'react-jsx-highcharts';

export function HighchartsStockChart(props: HighchartsChartProps): ReactElement;

// Navigator
type NavigatorProps = {
  children?: ReactNode;
} & Partial<Highcharts.NavigatorOptions>;
export function Navigator(props: NavigatorProps): ReactElement;
export namespace Navigator {
  type NavigatorSeriesProps = {
    seriesId: string
  }
  export function Series(props: NavigatorSeriesProps): ReactElement;

  type NavigatorXAxisProps = {
    children?: ReactNode
  } & Partial<Highcharts.NavigatorXAxisOptions>;
  export function XAxis(props: NavigatorXAxisProps): ReactElement;

  type NavigatorYAxisProps = {
    children?: ReactNode
  } & Partial<Highcharts.NavigatorYAxisOptions>;
  export function YAxis(props: NavigatorYAxisProps): ReactElement;
}

// RangeSelector
type RangeSelectorProps = {
  children?: ReactNode;
} & Partial<Highcharts.RangeSelectorOptions>;
export function RangeSelector(
  props: RangeSelectorProps
): ReactElement;
export namespace RangeSelector {
  type RangeSelectorButtonProps = {
    children?: ReactNode;
  } & Partial<Omit<Highcharts.RangeSelectorButtonsOptions, "text">>;
  export function Button(props: RangeSelectorButtonProps): ReactElement;

  type RangeSelectorInputProps = {
    boxBorderColor?: Highcharts.ColorString;
    boxHeight?: number;
    boxWidth?: (number|undefined);
    dateFormat?: string;
    dateParser?: Highcharts.RangeSelectorParseCallbackFunction;
    editDateFormat?: string;
    enabled?: boolean;
    position?: Highcharts.RangeSelectorInputPositionOptions;
    spacing?: number;
    style?: Highcharts.CSSObject;
  }
  export function Input(props: RangeSelectorInputProps): ReactElement;
}

// Scrollbar
export function Scrollbar(props: Highcharts.ScrollbarOptions): ReactElement;

// Series
export function CandlestickSeries(
  props: SeriesProps<Highcharts.SeriesCandlestickOptions>
): ReactElement;
export function FlagsSeries(
  props: SeriesProps<Highcharts.SeriesFlagsOptions>
): ReactElement;
export function OHLCSeries(
  props: SeriesProps<Highcharts.SeriesOhlcOptions>
): ReactElement;
