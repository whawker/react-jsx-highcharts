import { useEffect, useRef, memo } from 'react';
import { getNonEventHandlerProps } from '../../utils/events';
import useModifiedProps from '../UseModifiedProps';
import useChart from '../UseChart';
import useManualEventHandlers from '../UseManualEventHandlers';

import type {
  ChartAddSeriesCallbackFunction,
  ExportingAfterPrintCallbackFunction,
  ExportingBeforePrintCallbackFunction,
  ChartClickCallbackFunction,
  DrilldownCallbackFunction,
  DrillupCallbackFunction,
  DrillupAllCallbackFunction,
  ExportDataCallbackFunction,
  ChartLoadCallbackFunction,
  ChartRedrawCallbackFunction,
  ChartRenderCallbackFunction,
  ChartSelectionCallbackFunction,
  ChartOptions
} from 'highcharts';
import type { ChartContextValue } from '../UseChart';

export type ChartProps = {
  onAddSeries?: ChartAddSeriesCallbackFunction;
  onAfterPrint?: ExportingAfterPrintCallbackFunction;
  onBeforePrint?: ExportingBeforePrintCallbackFunction;
  onClick?: ChartClickCallbackFunction;
  onDrilldown?: DrilldownCallbackFunction;
  onDrillup?: DrillupCallbackFunction;
  onDrillupall?: DrillupAllCallbackFunction;
  onExportData?: ExportDataCallbackFunction;
  onLoad?: ChartLoadCallbackFunction;
  onRedraw?: ChartRedrawCallbackFunction;
  onRender?: ChartRenderCallbackFunction;
  onSelection?: ChartSelectionCallbackFunction;
  [x: string]: unknown; // TODO: this is here to allow eventhandlers like onAfterAddSeries
} & Partial<ChartOptions>;

const Chart = memo(
  ({ type = 'line', width, height, ...restProps }: ChartProps) => {
    const chart = useChart();
    const mounted = useRef(false);

    const modifiedProps = useModifiedProps({ type, ...restProps });

    useEffect(() => {
      if (!(width === undefined && height === undefined)) {
        // @ts-expect-error chart.setSize does not accept string
        chart.setSize(width, height);
      }
    }, [width, height]);

    useEffect(() => {
      if (modifiedProps !== false && mounted.current) {
        const notEventProps = getNonEventHandlerProps(modifiedProps);
        if (Object.getOwnPropertyNames(notEventProps).length > 0) {
          updateChart(modifiedProps, chart);
        }
      }
    });

    useEffect(() => {
      const notEventProps = getNonEventHandlerProps({ type, ...restProps });

      updateChart(notEventProps, chart);
      mounted.current = true;
    }, []);

    useManualEventHandlers(restProps, chart.object);

    return null;
  }
);

const updateChart = (
  config: Partial<ChartOptions>,
  chart: ChartContextValue
) => {
  chart.update({ chart: config }, false);
  chart.needsRedraw();
};

Chart.displayName = 'Chart';

export default Chart;
