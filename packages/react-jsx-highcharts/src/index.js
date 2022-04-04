import withSeriesType from './components/WithSeriesType';

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
export const AreaRangeSeries = withSeriesType('AreaRange');
export const AreaSeries = withSeriesType('Area');
export const AreaSplineRangeSeries = withSeriesType('AreaSplineRange');
export const AreaSplineSeries = withSeriesType('AreaSpline');
export { default as BarSeries } from './components/BarSeries';
export const BellCurveSeries = withSeriesType('BellCurve', {});
export const BoxPlotSeries = withSeriesType('BoxPlot');
export const BubbleSeries = withSeriesType('Bubble');
export const BulletSeries = withSeriesType('Bullet');
export const ColumnPyramidSeries = withSeriesType('ColumnPyramid');
export const ColumnRangeSeries = withSeriesType('ColumnRange');
export const ColumnSeries = withSeriesType('Column');
export const CylinderSeries = withSeriesType('Cylinder');
export const DependencyWheelSeries = withSeriesType('DependencyWheel');
export const ErrorBarSeries = withSeriesType('ErrorBar');
export const FunnelSeries = withSeriesType('Funnel', axisNotRequired);
export const Funnel3dSeries = withSeriesType('Funnel3d');
export const GaugeSeries = withSeriesType('Gauge');
export const HeatmapSeries = withSeriesType('Heatmap');
export const HistogramSeries = withSeriesType('Histogram', {});
export const ItemSeries = withSeriesType('Item');
export const LineSeries = withSeriesType('Line');
export const NetworkGraphSeries = withSeriesType('NetworkGraph');
export const PackedBubbleSeries = withSeriesType(
  'PackedBubble',
  axisNotRequired
);
export const ParetoSeries = withSeriesType('Pareto', {});
export const PieSeries = withSeriesType('Pie', axisNotRequired);
export const PolygonSeries = withSeriesType('Polygon');
export const PyramidSeries = withSeriesType('Pyramid', axisNotRequired);
export const Pyramid3dSeries = withSeriesType('Pyramid3d');
export const SankeySeries = withSeriesType('Sankey');
export const OrganizationSeries = withSeriesType('Organization');
export const ScatterSeries = withSeriesType('Scatter');
export const Scatter3dSeries = withSeriesType('Scatter3d');
export const SolidGaugeSeries = withSeriesType('SolidGauge');
export const SplineSeries = withSeriesType('Spline');
export const StreamGraphSeries = withSeriesType('StreamGraph');
export const SunburstSeries = withSeriesType('Sunburst');
export const TilemapSeries = withSeriesType('Tilemap');
export const TimelineSeries = withSeriesType('Timeline');
export const TreemapSeries = withSeriesType('Treemap');
export const VariablePieSeries = withSeriesType('VariablePie', axisNotRequired);
export const VariwideSeries = withSeriesType('Variwide');
export const VennSeries = withSeriesType('Venn', axisNotRequired);
export const VectorSeries = withSeriesType('Vector');
export const WaterfallSeries = withSeriesType('Waterfall');
export const WindBarbSeries = withSeriesType('WindBarb');
export const XRangeSeries = withSeriesType('XRange');

// Hooks
export { default as useHighcharts } from './components/UseHighcharts';
export { default as useChart } from './components/UseChart';
export { default as useAxis } from './components/UseAxis';
export { default as useSeries } from './components/UseSeries';
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
