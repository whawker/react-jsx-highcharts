import debounce from '../../utils/debounce-raf';

import type { ChartContextValue } from '../ChartContext';
import type { Chart } from 'highcharts';

const createProvidedChart = (
  chart: Chart,
  type: string
): ChartContextValue => ({
  object: chart,
  type,
  get: chart.get.bind(chart),
  setSize: chart.setSize.bind(chart),
  update: chart.update.bind(chart),
  addAxis: chart.addAxis.bind(chart),
  addColorAxis: chart.addColorAxis.bind(chart),
  addSeries: chart.addSeries.bind(chart),
  setTitle: chart.setTitle.bind(chart),
  setCaption: chart.setCaption.bind(chart),
  showLoading: chart.showLoading.bind(chart),
  hideLoading: chart.hideLoading.bind(chart),
  addCredits: chart.addCredits.bind(chart),
  // @ts-expect-error addAnnotation comes as side effect of loading the annotations module
  addAnnotation: chart.addAnnotation ? chart.addAnnotation.bind(chart) : null,
  // @ts-expect-error removeAnnotation comes as side effect of loading the annotations module
  removeAnnotation: chart.removeAnnotation
    ? // @ts-expect-error removeAnnotation comes as side effect of loading the annotations module
      chart.removeAnnotation.bind(chart)
    : null,
  needsRedraw: debounce(() => {
    // @ts-expect-error __destroyed is not a typed property on Chart
    if (!chart.__destroyed) {
      try {
        chart.redraw.bind(chart)();
      } catch {
        // ignore
      }
    }
  })
});

export default createProvidedChart;
