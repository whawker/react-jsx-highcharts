import type * as Highcharts from 'highcharts';
import type { ReactElement, ReactNode } from 'react';

interface HighchartsProviderProps {
  Highcharts: any;
  children?: ReactNode;
}
/**
 * Provides HighchartsContext to children.
 *
 */
export function HighchartsProvider(
  props: HighchartsProviderProps
): ReactElement;

type HighchartsChartProps = {
  callback?: (chart: Highcharts.Chart) => void;
  className?: string;
  containerProps?: Record<string, unknown>;
  children?: ReactNode;
  [x: string]: any; // TODO: this is here to allow eventhandlers like onLegendItemClick
} & Partial<Highcharts.Options>;

export function HighchartsChart(props: HighchartsChartProps): ReactElement;
export function HighchartsSparkline(props: any): ReactElement;
export function Highcharts3dChart(props: any): ReactElement;

type AnnotationProps = Partial<Highcharts.AnnotationsOptions>;

export function Annotation(props: AnnotationProps): ReactElement;

type CaptionProps = {
  children?: ReactNode;
} & Partial<Omit<Highcharts.CaptionOptions, 'text'>>;

export function Caption(props: CaptionProps): ReactElement;

type ChartProps = {
  onAddSeries?: Highcharts.ChartAddSeriesCallbackFunction;
  onAfterPrint?: Highcharts.ExportingAfterPrintCallbackFunction;
  onBeforePrint?: Highcharts.ExportingBeforePrintCallbackFunction;
  onClick?: Highcharts.ChartClickCallbackFunction;
  onDrilldown?: Highcharts.DrilldownCallbackFunction;
  onDrillup?: Highcharts.DrillupCallbackFunction;
  onDrillupall?: Highcharts.DrillupAllCallbackFunction;
  onExportData?: Highcharts.ExportDataCallbackFunction;
  onLoad?: Highcharts.ChartLoadCallbackFunction;
  onRedraw?: Highcharts.ChartRedrawCallbackFunction;
  onRender?: Highcharts.ChartRenderCallbackFunction;
  onSelection?: Highcharts.ChartSelectionCallbackFunction;
  [x: string]: any; // TODO: this is here to allow eventhandlers like onAfterAddSeries
} & Partial<Highcharts.ChartOptions>;

export function Chart(props: ChartProps): ReactElement;

type ColorAxisProps = {
  children?: ReactNode;
  onAfterSetExtremes?: Highcharts.AxisSetExtremesEventCallbackFunction;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onLegendItemClick?: Function; // TODO type missing in Highcharts 8.1.0
  onSetExtremes?: Highcharts.AxisSetExtremesEventCallbackFunction;
} & Partial<Highcharts.ColorAxisOptions>;

export function ColorAxis(props: ColorAxisProps): ReactElement;

type CreditProps = {
  children?: ReactNode;
} & Partial<Omit<Highcharts.CreditsOptions, 'text'>>;

export function Credits(props: CreditProps): ReactElement;

type LoadingProps = {
  children?: ReactNode;
  isLoading?: boolean;
} & Partial<Omit<Highcharts.LoadingOptions, 'text'>>;
export function Loading(props: LoadingProps): ReactElement;

type LegendProps = {
  children?: ReactNode;
} & Partial<Highcharts.LegendOptions>;

export function Legend(props: LegendProps): ReactElement;

export namespace Legend {
  type LegendTitleProps = {
    children?: ReactNode;
  } & Partial<Omit<Highcharts.LegendTitleOptions, 'text'>>;
  export function Label(props: LegendTitleProps): ReactElement;
}

type PaneProps = Partial<Highcharts.PaneOptions>;

export function Pane(props: PaneProps): ReactElement;

type PlotBandProps = {
  children?: ReactNode;
} & Partial<Highcharts.AxisPlotBandsOptions>;

export function PlotBand(props: PlotBandProps): ReactElement;
export namespace PlotBand {
  type PlotBandLabelProps = {
    children?: ReactNode;
  } & Partial<Omit<Highcharts.AxisPlotBandsLabelOptions, 'text'>>;
  export function Label(props: PlotBandLabelProps): ReactElement;
}

type PlotLineProps = {
  children?: ReactNode;
} & Partial<Highcharts.AxisPlotLinesOptions>;

export function PlotLine(props: PlotLineProps): ReactElement;

export namespace PlotLine {
  type PlotLineLabelProps = {
    children?: ReactNode;
  } & Partial<Omit<Highcharts.AxisPlotLinesLabelOptions, 'text'>>;
  export function Label(props: PlotLineLabelProps): ReactElement;
}

/**
 *
 * @private
 */
export function PlotBandLine(props: any): ReactElement;

type SubtitleProps = {
  children?: ReactNode;
} & Partial<Omit<Highcharts.SubtitleOptions, 'text'>>;

export function Subtitle(props: SubtitleProps): ReactElement;

type TitleProps = {
  children?: ReactNode;
} & Partial<Omit<Highcharts.TitleOptions, 'text'>>;

export function Title(props: TitleProps): ReactElement;

type TooltipProps = Partial<Highcharts.TooltipOptions>;

export function Tooltip(props: TooltipProps): ReactElement;

type AxisProps<TAxisOptions> = {
  children?: ReactNode;
  onAfterBreaks?: Highcharts.AxisEventCallbackFunction;
  onAfterSetExtremes?: Highcharts.AxisSetExtremesEventCallbackFunction;
  onPointBreak?: Highcharts.AxisPointBreakEventCallbackFunction;
  onPointInBreak?: Highcharts.AxisPointBreakEventCallbackFunction;
  onSetExtremes?: Highcharts.AxisSetExtremesEventCallbackFunction;
} & Partial<TAxisOptions>;

export function XAxis(props: AxisProps<Highcharts.XAxisOptions>): ReactElement;

type AxisTitleProps = {
  children?: ReactNode;
} & Partial<Omit<Highcharts.AxisTitleOptions, 'text'>>;

export namespace XAxis {
  export function Title(props: AxisTitleProps): ReactElement;
}
export function YAxis(props: AxisProps<Highcharts.YAxisOptions>): ReactElement;

export namespace YAxis {
  export function Title(props: AxisTitleProps): ReactElement;
}
export function ZAxis(props: AxisProps<Highcharts.ZAxisOptions>): ReactElement;

export namespace ZAxis {
  export function Title(props: AxisTitleProps): ReactElement;
}

// Series
type SeriesProps<TSeriesOptions = Partial<Highcharts.SeriesOptions>> = {
  children?: ReactNode;
  jsxOptions?: {
    updatePoints?: boolean;
  };
  onAfterAnimate?: Highcharts.SeriesAfterAnimateCallbackFunction;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onCheckboxClick?: Function | Highcharts.SeriesCheckboxClickCallbackFunction;
  onClick?: Highcharts.SeriesClickCallbackFunction;
  onHide?: Highcharts.SeriesHideCallbackFunction;
  onLegendItemClick?: Highcharts.SeriesLegendItemClickCallbackFunction;

  onMouseOut?: Highcharts.SeriesMouseOutCallbackFunction;
  onMouseOver?: Highcharts.SeriesMouseOverCallbackFunction;
  // eslint-disable-next-line @typescript-eslint/ban-types
  onSetRootNode?: Function; // TODO missing type in Highcharts 8.1.0
  onShow?: Highcharts.SeriesShowCallbackFunction;
  [x: string]: any; // TODO: this is here to allow unknown eventhandlers
} & Partial<Omit<TSeriesOptions, 'type'>>;

export function AreaRangeSeries(
  props: SeriesProps<Highcharts.SeriesArearangeOptions>
): ReactElement;
export function AreaSeries(
  props: SeriesProps<Highcharts.SeriesAreaOptions>
): ReactElement;
export function AreaSplineRangeSeries(
  props: SeriesProps<Highcharts.SeriesAreasplinerangeOptions>
): ReactElement;
export function AreaSplineSeries(
  props: SeriesProps<Highcharts.SeriesAreasplineOptions>
): ReactElement;
export function BarSeries(
  props: SeriesProps<Highcharts.SeriesBarOptions>
): ReactElement;
export function BellCurveSeries(
  props: SeriesProps<Highcharts.SeriesBellcurveOptions>
): ReactElement;
export function BoxPlotSeries(
  props: SeriesProps<Highcharts.SeriesBoxplotOptions>
): ReactElement;
export function BubbleSeries(
  props: SeriesProps<Highcharts.SeriesBubbleOptions>
): ReactElement;
export function BulletSeries(
  props: SeriesProps<Highcharts.SeriesBulletOptions>
): ReactElement;
export function ColumnPyramidSeries(
  props: SeriesProps<Highcharts.SeriesColumnpyramidOptions>
): ReactElement;
export function ColumnRangeSeries(
  props: SeriesProps<Highcharts.SeriesColumnrangeOptions>
): ReactElement;

export function ColumnSeries(
  props: SeriesProps<Highcharts.SeriesColumnOptions>
): ReactElement;

export function CylinderSeries(
  props: SeriesProps<Highcharts.SeriesCylinderOptions>
): ReactElement;
export function DependencyWheelSeries(
  props: SeriesProps<Highcharts.SeriesDependencywheelOptions>
): ReactElement;
export function ErrorBarSeries(
  props: SeriesProps<Highcharts.SeriesErrorbarOptions>
): ReactElement;
export function FunnelSeries(
  props: SeriesProps<Highcharts.SeriesFunnelOptions>
): ReactElement;
export function Funnel3dSeries(
  props: SeriesProps<Highcharts.SeriesFunnel3dOptions>
): ReactElement;
export function GaugeSeries(
  props: SeriesProps<Highcharts.SeriesGaugeOptions>
): ReactElement;
export function HeatmapSeries(
  props: SeriesProps<Highcharts.SeriesHeatmapOptions>
): ReactElement;
export function HistogramSeries(
  props: SeriesProps<Highcharts.SeriesHistogramOptions>
): ReactElement;
export function ItemSeries(
  props: SeriesProps<Highcharts.SeriesItemOptions>
): ReactElement;
export function LineSeries(
  props: SeriesProps<Highcharts.SeriesLineOptions>
): ReactElement;
export function NetworkGraphSeries(
  props: SeriesProps<Highcharts.SeriesNetworkgraphOptions>
): ReactElement;
export function PackedBubbleSeries(
  props: SeriesProps<Highcharts.SeriesPackedbubbleOptions>
): ReactElement;
export function ParetoSeries(
  props: SeriesProps<Highcharts.SeriesParetoOptions>
): ReactElement;
export function PieSeries(
  props: SeriesProps<Highcharts.SeriesPieOptions>
): ReactElement;
export function PolygonSeries(
  props: SeriesProps<Highcharts.SeriesPolygonOptions>
): ReactElement;
export function PyramidSeries(
  props: SeriesProps<Highcharts.SeriesPyramidOptions>
): ReactElement;
export function Pyramid3dSeries(
  props: SeriesProps<Highcharts.SeriesPyramid3dOptions>
): ReactElement;
export function SankeySeries(
  props: SeriesProps<Highcharts.SeriesSankeyOptions>
): ReactElement;
export function OrganizationSeries(
  props: SeriesProps<Highcharts.SeriesOrganizationOptions>
): ReactElement;
export function ScatterSeries(
  props: SeriesProps<Highcharts.SeriesScatterOptions>
): ReactElement;
export function Scatter3dSeries(
  props: SeriesProps<Highcharts.SeriesScatter3dOptions>
): ReactElement;
export function SolidGaugeSeries(
  props: SeriesProps<Highcharts.SeriesSolidgaugeOptions>
): ReactElement;
export function SplineSeries(
  props: SeriesProps<Highcharts.SeriesSplineOptions>
): ReactElement;
export function StreamGraphSeries(
  props: SeriesProps<Highcharts.SeriesStreamgraphOptions>
): ReactElement;
export function SunburstSeries(
  props: SeriesProps<Highcharts.SeriesSunburstOptions>
): ReactElement;
export function TilemapSeries(
  props: SeriesProps<Highcharts.SeriesTilemapOptions>
): ReactElement;
export function TimelineSeries(
  props: SeriesProps<Highcharts.SeriesTimelineOptions>
): ReactElement;
export function TreemapSeries(
  props: SeriesProps<Highcharts.SeriesTreemapOptions>
): ReactElement;
export function VariablePieSeries(
  props: SeriesProps<Highcharts.SeriesVariablepieOptions>
): ReactElement;
export function VariwideSeries(
  props: SeriesProps<Highcharts.SeriesVariwideOptions>
): ReactElement;
export function VennSeries(
  props: SeriesProps<Highcharts.SeriesVennOptions>
): ReactElement;
export function VectorSeries(
  props: SeriesProps<Highcharts.SeriesVectorOptions>
): ReactElement;
export function WaterfallSeries(
  props: SeriesProps<Highcharts.SeriesWaterfallOptions>
): ReactElement;
export function WindBarbSeries(
  props: SeriesProps<Highcharts.SeriesWindbarbOptions>
): ReactElement;
export function XRangeSeries(
  props: SeriesProps<Highcharts.SeriesXrangeOptions>
): ReactElement;

// Hooks
export function useHighcharts(): any;

type ChartContextValue = {
  object: Highcharts.Chart;
  type: string;
  get: Highcharts.Chart['get'];
  setSize: Highcharts.Chart['setSize'];
  update: Highcharts.Chart['update'];
  addAxis: Highcharts.Chart['addAxis'];
  addColorAxis: Highcharts.Chart['addColorAxis'];
  addSeries: Highcharts.Chart['addSeries'];
  setTitle: Highcharts.Chart['setTitle'];
  setCaption: Highcharts.Chart['setCaption'];
  showLoading: Highcharts.Chart['showLoading'];
  hideLoading: Highcharts.Chart['hideLoading'];
  addCredits: Highcharts.Chart['addCredits'];
  addAnnotation?: any; // missing type in highcharts
  removeAnnotation?: any; // missing type in highcharts
  /**
   * Debounced chart redraw
   */
  needsRedraw: () => void;
};

export function useChart(): ChartContextValue | null;

type AxisContextValue = {
  object: Highcharts.Axis;
  type: string;
  id: string;
  update: Highcharts.Axis['update'];
  remove: Highcharts.Axis['remove'];
  addPlotBandOrLine: any; // missing type in highcharts
  removePlotBandOrLine: any; // missing type in highcharts
  getExtremes: Highcharts.Axis['getExtremes'];
  setExtremes: Highcharts.Axis['setExtremes'];
  setTitle: Highcharts.Axis['setTitle'];
};

export function useAxis(id?: string): AxisContextValue | null;

type SeriesContextValue = {
  object: Highcharts.Series;
  type: string;
  id: string;
  update: Highcharts.Series['update'];
  remove: Highcharts.Series['remove'];
  setData: Highcharts.Series['setData'];
  setVisible: Highcharts.Series['setVisible'];
};

export function useSeries(id?: string): SeriesContextValue | null;

type PlotBandLineContextValue = {
  object: Highcharts.PlotLineOrBand;
  id: string;
};
export function usePlotBandLine(id?: string): PlotBandLineContextValue | null;

// utility hooks, not part of api
//export function useModifiedProps UseModifiedProps';

// Helpers
/**
 * Provides HighchartsContext to component.
 * @deprecated use &lt;HighchartsProvider&gt; instead
 * @see {@link HighchartsProvider}
 */
export function withHighcharts<P>(
  Component: React.ComponentType<P>,
  Highcharts: any
): React.ComponentType<P>;

// helpers
/**
 *
 * @private
 */
export function Axis(props: any): ReactElement;
/**
 *
 * @private
 */
export function BaseChart(props: any): ReactElement;
/**
 *
 * @private
 */
export function Debug(props: any): ReactElement;
/**
 *
 * @private
 */
export function Series(props: any): ReactElement;

// Utils
/**
 *
 * @private
 */
export function getNonEventHandlerProps(...any: any[]): any;
/**
 *
 * @private
 */
export function getEventsConfig(...any: any[]): any;
/**
 *
 * @private
 */
export function withSeriesType(...any: any[]): any;
