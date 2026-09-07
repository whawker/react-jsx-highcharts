import { createContext } from 'react';

import type { Chart } from 'highcharts';

export type ChartContextValue = {
  object: Chart;
  type: string;
  get: Chart['get'];
  setSize: Chart['setSize'];
  update: Chart['update'];
  addAxis: Chart['addAxis'];
  addColorAxis: Chart['addColorAxis'];
  addSeries: Chart['addSeries'];
  setTitle: Chart['setTitle'];
  setCaption: Chart['setCaption'];
  showLoading: Chart['showLoading'];
  hideLoading: Chart['hideLoading'];
  addCredits: Chart['addCredits'];
  /**
   * addAnnotation needs the highcharts annotations module
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addAnnotation?: any;
  /**
   * removeAnnotation needs the highcharts annotations module
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  removeAnnotation?: any;
  /**
   * Debounced chart redraw
   */
  needsRedraw: () => void;
};

const ChartContext = createContext<ChartContextValue | null>(null);
ChartContext.displayName = 'ChartContext';

export default ChartContext;
