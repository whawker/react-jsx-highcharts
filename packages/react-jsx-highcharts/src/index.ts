import withSeriesType from './components/WithSeriesType';

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
export { HighchartsProvider } from './components/WithHighcharts';

// Graphs
export { default as HighchartsChart } from './components/HighchartsChart';
export { default as HighchartsSparkline } from './components/HighchartsSparkline';
export { default as Highcharts3dChart } from './components/Highcharts3dChart';

// Graph parts
export { default as Annotation } from './components/Annotation';
export { default as Caption } from './components/Caption';
export { default as Chart } from './components/Chart';
export { default as ColorAxis } from './components/ColorAxis';
export { default as Credits } from './components/Credits';
export { default as Loading } from './components/Loading';
export { default as Legend } from './components/Legend';
export { default as Pane } from './components/Pane';
export { PlotBand, PlotLine } from './components/PlotBandLine';
export { default as Subtitle } from './components/Subtitle';
export { default as Title } from './components/Title';
export { default as Tooltip } from './components/Tooltip';
export { default as XAxis } from './components/XAxis';
export { default as YAxis } from './components/YAxis';
export { default as ZAxis } from './components/ZAxis';

const axisNotRequired = { requiresAxis: false };

// Series
export const AreaRangeSeries =
  withSeriesType<SeriesArearangeOptions>('AreaRange');
export const AreaSeries = withSeriesType<SeriesAreaOptions>('Area');
export const AreaSplineRangeSeries =
  withSeriesType<SeriesAreasplinerangeOptions>('AreaSplineRange');
export const AreaSplineSeries =
  withSeriesType<SeriesAreasplineOptions>('AreaSpline');
export { default as BarSeries } from './components/BarSeries';
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
export { default as useHighcharts } from './components/UseHighcharts';
export { default as useChart } from './components/UseChart';
export type { ChartContextValue } from './components/ChartContext';
export { default as useAxis } from './components/UseAxis';
export type { AxisContextValue } from './components/AxisContext';
export { default as useSeries } from './components/UseSeries';
export type { SeriesContextValue } from './components/SeriesContext';
export { default as usePlotBandLine } from './components/UsePlotBandLine';

// utility hooks, not part of api
export { default as useModifiedProps } from './components/UseModifiedProps';

// Helpers
export { default as withHighcharts } from './components/WithHighcharts';
export { default as Axis } from './components/Axis';
export { default as BaseChart } from './components/BaseChart';
export { default as Debug } from './components/Debug';
export { default as Series } from './components/Series';

// Utils
export { getNonEventHandlerProps } from './utils/events';
export { getEventsConfig } from './utils/events';
export { withSeriesType };
