import withSeriesType from './components/WithSeriesType/index.tsx';

import type {
  SeriesLineOptions,
  SeriesNetworkgraphOptions,
  SeriesArearangeOptions,
  SeriesAreaOptions,
  SeriesAreasplineOptions,
  SeriesAreasplinerangeOptions,
  SeriesBellcurveOptions,
  SeriesItemOptions,
  SeriesHistogramOptions,
  SeriesHeatmapOptions,
  SeriesGaugeOptions,
  SeriesFunnel3dOptions,
  SeriesFunnelOptions,
  SeriesErrorbarOptions,
  SeriesDependencywheelOptions,
  SeriesCylinderOptions,
  SeriesColumnOptions,
  SeriesColumnrangeOptions,
  SeriesColumnpyramidOptions,
  SeriesBulletOptions,
  SeriesBubbleOptions,
  SeriesBoxplotOptions,
  SeriesParetoOptions,
  SeriesPieOptions,
  SeriesPolygonOptions,
  SeriesVariablepieOptions,
  SeriesVariwideOptions,
  SeriesXrangeOptions,
  SeriesWindbarbOptions,
  SeriesWaterfallOptions,
  SeriesVectorOptions,
  SeriesVennOptions,
  SeriesTreemapOptions,
  SeriesTimelineOptions,
  SeriesTilemapOptions,
  SeriesSunburstOptions,
  SeriesStreamgraphOptions,
  SeriesSplineOptions,
  SeriesSolidgaugeOptions,
  SeriesScatter3dOptions,
  SeriesScatterOptions,
  SeriesOrganizationOptions,
  SeriesSankeyOptions,
  SeriesPyramid3dOptions,
  SeriesPyramidOptions
} from 'highcharts';

// Main provider
export { HighchartsProvider } from './components/WithHighcharts/index.tsx';

// Graphs
export { default as HighchartsChart } from './components/HighchartsChart/index.ts';
export { default as HighchartsSparkline } from './components/HighchartsSparkline/index.ts';
export { default as Highcharts3dChart } from './components/Highcharts3dChart/index.ts';

// Graph parts
export { default as Annotation } from './components/Annotation/index.ts';
export { default as Caption } from './components/Caption/index.ts';
export { default as Chart } from './components/Chart/index.ts';
export { default as ColorAxis } from './components/ColorAxis/index.ts';
export { default as Credits } from './components/Credits/index.ts';
export { default as Loading } from './components/Loading/index.ts';
export { default as Legend } from './components/Legend/index.ts';
export { default as Pane } from './components/Pane/index.ts';
export { PlotBand, PlotLine } from './components/PlotBandLine/index.ts';
export { default as Subtitle } from './components/Subtitle/index.ts';
export { default as Title } from './components/Title/index.ts';
export { default as Tooltip } from './components/Tooltip/index.ts';
export { default as XAxis } from './components/XAxis/index.ts';
export { default as YAxis } from './components/YAxis/index.ts';
export { default as ZAxis } from './components/ZAxis/index.ts';

const axisNotRequired = { requiresAxis: false };

// Series
export const AreaRangeSeries =
  withSeriesType<SeriesArearangeOptions>('AreaRange');
export const AreaSeries = withSeriesType<SeriesAreaOptions>('Area');
export const AreaSplineRangeSeries =
  withSeriesType<SeriesAreasplinerangeOptions>('AreaSplineRange');
export const AreaSplineSeries =
  withSeriesType<SeriesAreasplineOptions>('AreaSpline');
export { default as BarSeries } from './components/BarSeries/index.ts';
export const BellCurveSeries = withSeriesType<SeriesBellcurveOptions>(
  'BellCurve',
  {}
);
export const BoxPlotSeries = withSeriesType<SeriesBoxplotOptions>('BoxPlot');
export const BubbleSeries = withSeriesType<SeriesBubbleOptions>('Bubble');
export const BulletSeries = withSeriesType<SeriesBulletOptions>('Bullet');
export const ColumnPyramidSeries =
  withSeriesType<SeriesColumnpyramidOptions>('ColumnPyramid');
export const ColumnRangeSeries =
  withSeriesType<SeriesColumnrangeOptions>('ColumnRange');
export const ColumnSeries = withSeriesType<SeriesColumnOptions>('Column');
export const CylinderSeries = withSeriesType<SeriesCylinderOptions>('Cylinder');
export const DependencyWheelSeries =
  withSeriesType<SeriesDependencywheelOptions>('DependencyWheel');
export const ErrorBarSeries = withSeriesType<SeriesErrorbarOptions>('ErrorBar');
export const FunnelSeries = withSeriesType<SeriesFunnelOptions>(
  'Funnel',
  axisNotRequired
);
export const Funnel3dSeries = withSeriesType<SeriesFunnel3dOptions>('Funnel3d');
export const GaugeSeries = withSeriesType<SeriesGaugeOptions>('Gauge');
export const HeatmapSeries = withSeriesType<SeriesHeatmapOptions>('Heatmap');
export const HistogramSeries = withSeriesType<SeriesHistogramOptions>(
  'Histogram',
  {}
);
export const ItemSeries = withSeriesType<SeriesItemOptions>('Item');
export const LineSeries = withSeriesType<SeriesLineOptions>('Line');
export const NetworkGraphSeries =
  withSeriesType<SeriesNetworkgraphOptions>('NetworkGraph');
export const PackedBubbleSeries = withSeriesType(
  'PackedBubble',
  axisNotRequired
);
export const ParetoSeries = withSeriesType<SeriesParetoOptions>('Pareto', {});
export const PieSeries = withSeriesType<SeriesPieOptions>(
  'Pie',
  axisNotRequired
);
export const PolygonSeries = withSeriesType<SeriesPolygonOptions>('Polygon');
export const PyramidSeries = withSeriesType<SeriesPyramidOptions>(
  'Pyramid',
  axisNotRequired
);
export const Pyramid3dSeries =
  withSeriesType<SeriesPyramid3dOptions>('Pyramid3d');
export const SankeySeries = withSeriesType<SeriesSankeyOptions>('Sankey');
export const OrganizationSeries =
  withSeriesType<SeriesOrganizationOptions>('Organization');
export const ScatterSeries = withSeriesType<SeriesScatterOptions>('Scatter');
export const Scatter3dSeries =
  withSeriesType<SeriesScatter3dOptions>('Scatter3d');
export const SolidGaugeSeries =
  withSeriesType<SeriesSolidgaugeOptions>('SolidGauge');
export const SplineSeries = withSeriesType<SeriesSplineOptions>('Spline');
export const StreamGraphSeries =
  withSeriesType<SeriesStreamgraphOptions>('StreamGraph');
export const SunburstSeries = withSeriesType<SeriesSunburstOptions>('Sunburst');
export const TilemapSeries = withSeriesType<SeriesTilemapOptions>('Tilemap');
export const TimelineSeries = withSeriesType<SeriesTimelineOptions>('Timeline');
export const TreemapSeries = withSeriesType<SeriesTreemapOptions>('Treemap');
export const VariablePieSeries = withSeriesType<SeriesVariablepieOptions>(
  'VariablePie',
  axisNotRequired
);
export const VariwideSeries = withSeriesType<SeriesVariwideOptions>('Variwide');
export const VennSeries = withSeriesType<SeriesVennOptions>(
  'Venn',
  axisNotRequired
);
export const VectorSeries = withSeriesType<SeriesVectorOptions>('Vector');
export const WaterfallSeries =
  withSeriesType<SeriesWaterfallOptions>('Waterfall');
export const WindBarbSeries = withSeriesType<SeriesWindbarbOptions>('WindBarb');
export const XRangeSeries = withSeriesType<SeriesXrangeOptions>('XRange');

// Hooks
export { default as useHighcharts } from './components/UseHighcharts/index.ts';
export { default as useChart } from './components/UseChart/index.ts';
export type { ChartContextValue } from './components/ChartContext/index.ts';
export { default as useAxis } from './components/UseAxis/index.ts';
export type { AxisContextValue } from './components/AxisContext/index.ts';
export { default as useSeries } from './components/UseSeries/index.ts';
export type { SeriesContextValue } from './components/SeriesContext/index.ts';
export { default as usePlotBandLine } from './components/UsePlotBandLine/index.ts';

// utility hooks, not part of api
export { default as useModifiedProps } from './components/UseModifiedProps/index.ts';

// Helpers
export { default as withHighcharts } from './components/WithHighcharts/index.tsx';
export { default as Axis } from './components/Axis/index.ts';
export { default as BaseChart } from './components/BaseChart/index.ts';
export { default as Debug } from './components/Debug/index.ts';
export { default as Series } from './components/Series/index.ts';

// Utils
export { getNonEventHandlerProps } from './utils/events.ts';
export { getEventsConfig } from './utils/events.ts';
export { withSeriesType };
