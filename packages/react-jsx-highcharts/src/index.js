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

const axisNotRequired = { additionalProps: { requiresAxis: false } };
const hasParentSeries = { additionalPropTypes: { baseSeries: PropTypes.string.isRequired } };

// Series
export const AreaRangeSeries = withSeriesType('arearange', 'AreaRangeSeries');
export const AreaSeries = withSeriesType('area', 'AreaSeries');
export const AreaSplineRangeSeries = withSeriesType('areasplinerange', 'AreaSplineRangeSeries');
export const AreaSplineSeries = withSeriesType('areaspline', 'AreaSplineSeries');
export { default as BarSeries }  from './components/BarSeries';
export const BellCurveSeries = withSeriesType('bellcurve', 'BellCurveSeries', hasParentSeries);
export const BoxPlotSeries = withSeriesType('boxplot', 'BoxPlotSeries');
export const BubbleSeries = withSeriesType('bubble', 'BubbleSeries');
export const BulletSeries = withSeriesType('bullet', 'BulletSeries');
export const ColumnRangeSeries = withSeriesType('columnrange', 'ColumnRangeSeries');
export const ColumnSeries = withSeriesType('column', 'ColumnSeries');
export const ErrorBarSeries = withSeriesType('errorbar', 'ErrorBarSeries');
export const FunnelSeries = withSeriesType('funnel', 'FunnelSeries', axisNotRequired);
export const GaugeSeries = withSeriesType('gauge', 'GaugeSeries');
export const HeatmapSeries = withSeriesType('heatmap', 'HeatmapSeries');
export const HistogramSeries = withSeriesType('histogram', 'HistogramSeries', hasParentSeries);
export const LineSeries = withSeriesType('line', 'LineSeries');
export const ParetoSeries = withSeriesType('pareto', 'ParetoSeries', hasParentSeries);
export const PieSeries = withSeriesType('pie', 'PieSeries', axisNotRequired);
export const PolygonSeries = withSeriesType('polygon', 'PolygonSeries');
export const PyramidSeries = withSeriesType('pyramid', 'PyramidSeries', axisNotRequired);
export const SankeySeries = withSeriesType('sankey', 'SankeySeries');
export const ScatterSeries = withSeriesType('scatter', 'ScatterSeries');
export const Scatter3dSeries = withSeriesType('scatter3d', 'Scatter3dSeries');
export const SolidGaugeSeries = withSeriesType('solidgauge', 'SolidGaugeSeries');
export const SplineSeries = withSeriesType('spline', 'SplineSeries');
export const StreamGraphSeries = withSeriesType('streamgraph', 'StreamGraphSeries');
export const SunburstSeries = withSeriesType('sunburst', 'SunburstSeries');
export const TilemapSeries = withSeriesType('tilemap', 'TilemapSeries');
export const TreemapSeries = withSeriesType('treemap', 'TreemapSeries');
export const VariablePieSeries = withSeriesType('variablepie', 'VariablePieSeries', axisNotRequired);
export const VariwideSeries = withSeriesType('variwide', 'VariwideSeries');
export const VectorSeries = withSeriesType('vector', 'VectorSeries');
export const WaterfallSeries = withSeriesType('waterfall', 'WaterfallSeries');
export const WindBarbSeries = withSeriesType('windbarb', 'WindBarbSeries');
export const XRangeSeries = withSeriesType('xrange', 'XRangeSeries');

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
