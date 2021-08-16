import type * as Highcharts from 'highcharts';
import type { ReactElement, ReactNode } from 'react';
import type {
  HighchartsChartProps,
  SeriesProps,
  AxisProps
} from 'react-jsx-highcharts';

export {
  Chart,
  ColorAxis,
  Credits,
  Debug,
  HighchartsProvider as HighmapsProvider,
  Loading,
  Legend,
  Series,
  Subtitle,
  Title,
  Tooltip,
  useHighcharts,
  useChart,
  useAxis,
  useSeries,
  withHighcharts as withHighmaps,
  withSeriesType
} from 'react-jsx-highcharts';

type HighchartsMapChartsProps = HighchartsChartProps & {
  map: Highcharts.GeoJSON;
};

export function HighchartsMapChart(
  props: HighchartsMapChartsProps
): ReactElement;

// Series
export function MapSeries(
  props: SeriesProps<Highcharts.SeriesMapOptions>
): ReactElement;

export function MapPointSeries(
  props: SeriesProps<Highcharts.SeriesMappointOptions>
): ReactElement;

export function MapLineSeries(
  props: SeriesProps<Highcharts.SeriesMaplineOptions>
): ReactElement;

export function MapBubbleSeries(
  props: SeriesProps<Highcharts.SeriesMapbubbleOptions>
): ReactElement;

// map navigator
type MapNavigatorProps = {
  children?: ReactNode;
} & Partial<Highcharts.MapNavigationOptions>;

export function MapNavigation(props: MapNavigatorProps): ReactElement;
export namespace MapNavigation {
  type ZoomButtonProps<TButtonProps> = { children?: ReactNode } & Omit<
    TButtonProps,
    'text'
  >;

  export function ZoomIn(
    props: ZoomButtonProps<Highcharts.MapNavigationButtonsZoomInOptions>
  ): ReactElement;

  export function ZoomOut(
    props: ZoomButtonProps<Highcharts.MapNavigationButtonsZoomOutOptions>
  ): ReactElement;

  type MapButtonProps = {
    children?: ReactNode;
    type: 'zoomIn' | 'zoomOut';
  } & Omit<Highcharts.MapNavigationButtonOptions, 'text'>;
  export function Button(props: MapButtonProps): ReactElement;
}

// Axis components
type MapAxisProps<TAxisOptions> = {
  endOnTick?: boolean;
  visible?: boolean;
  minPadding?: number;
  maxPadding?: number;
  startOnTick?: boolean;
  reversed?: boolean;
} & AxisProps<TAxisOptions>;

export function XAxis(
  props: MapAxisProps<Highcharts.XAxisOptions>
): ReactElement;
export function YAxis(
  props: MapAxisProps<Highcharts.YAxisOptions>
): ReactElement;
