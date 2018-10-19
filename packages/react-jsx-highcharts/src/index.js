import PropTypes from 'prop-types';
import withSeriesType from './components/WithSeriesType'

// Graphs
export { default as HighchartsChart }  from './components/HighchartsChart';
export { default as HighchartsSparkline }  from './components/HighchartsSparkline';
export { default as Highcharts3dChart }  from './components/Highcharts3dChart';

// Graph parts
export { default as Chart }  from './components/Chart';
export { default as Credits }  from './components/Credits';
export { default as Loading }  from './components/Loading';
export { default as Legend }  from './components/Legend';
export { default as Pane }  from './components/Pane';
export { default as PlotBand }  from './components/PlotBand';
export { default as PlotLine }  from './components/PlotLine';
export { default as Subtitle }  from './components/Subtitle';
export { default as Title }  from './components/Title';
export { default as Tooltip }  from './components/Tooltip';
export { default as XAxis }  from './components/XAxis';
export { default as YAxis }  from './components/YAxis';
export { default as ZAxis }  from './components/ZAxis';

const axisNotRequired = { requiresAxis: false };
const hasParentSeries = { baseSeries: PropTypes.string.isRequired };

// Series
export const AreaRangeSeries = withSeriesType('AreaRange');
export const AreaSeries = withSeriesType('Area');
export const AreaSplineRangeSeries = withSeriesType('AreaSplineRange');
export const AreaSplineSeries = withSeriesType('AreaSpline');
export { default as BarSeries }  from './components/BarSeries';
export const BellCurveSeries = withSeriesType('BellCurve', {}, hasParentSeries);
export const BoxPlotSeries = withSeriesType('BoxPlot');
export const BubbleSeries = withSeriesType('Bubble');
export const BulletSeries = withSeriesType('Bullet');
export const ColumnRangeSeries = withSeriesType('ColumnRange');
export const ColumnSeries = withSeriesType('Column');
export const ErrorBarSeries = withSeriesType('ErrorBar');
export const FunnelSeries = withSeriesType('Funnel', axisNotRequired);
export const GaugeSeries = withSeriesType('Gauge');
export const HeatmapSeries = withSeriesType('Heatmap');
export const HistogramSeries = withSeriesType('Histogram', {}, hasParentSeries);
export const LineSeries = withSeriesType('Line');
export const ParetoSeries = withSeriesType('Pareto', {}, hasParentSeries);
export const PieSeries = withSeriesType('Pie', axisNotRequired);
export const PolygonSeries = withSeriesType('Polygon');
export const PyramidSeries = withSeriesType('Pyramid', axisNotRequired);
export const SankeySeries = withSeriesType('Sankey');
export const ScatterSeries = withSeriesType('Scatter');
export const Scatter3dSeries = withSeriesType('Scatter3d');
export const SolidGaugeSeries = withSeriesType('SolidGauge');
export const SplineSeries = withSeriesType('Spline');
export const StreamGraphSeries = withSeriesType('StreamGraph');
export const SunburstSeries = withSeriesType('Sunburst');
export const TilemapSeries = withSeriesType('Tilemap');
export const TreemapSeries = withSeriesType('Treemap');
export const VariablePieSeries = withSeriesType('VariablePie', axisNotRequired);
export const VariwideSeries = withSeriesType('Variwide');
export const VectorSeries = withSeriesType('Vector');
export const WaterfallSeries = withSeriesType('Waterfall');
export const WindBarbSeries = withSeriesType('WindBarb');
export const XRangeSeries = withSeriesType('XRange');

// Providers
export { default as provideHighcharts }  from './components/HighchartsProvider';
export { default as provideChart }  from './components/ChartProvider';
export { default as provideAxis }  from './components/AxisProvider';
export { default as provideSeries }  from './components/SeriesProvider';

// Helpers
export { default as withHighcharts }  from './components/WithHighcharts';
export { default as Axis }  from './components/Axis';
export { default as BaseChart }  from './components/BaseChart';
export { default as Debug }  from './components/Debug';
export { default as Hidden }  from './components/Hidden';
export { default as Series }  from './components/Series';

// Utils
export { default as getModifiedProps } from './utils/getModifiedProps';
export { getNonEventHandlerProps } from './utils/events';
export { getEventsConfig } from './utils/events';
export { withSeriesType }
