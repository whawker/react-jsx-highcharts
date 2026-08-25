export const uuidRegex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const Highcharts = {
  chart: vi.fn(),
  addEvent: vi.fn(),
  removeEvent: vi.fn(),
  Tooltip: vi.fn().mockImplementation(() => ({ update: vi.fn() }))
};

export const createMockChart = () => ({
  addAxis: vi.fn(),
  addColorAxis: vi.fn(),
  addSeries: vi.fn(),
  get: vi.fn(),
  setSize: vi.fn(),
  update: vi.fn(),
  setTitle: vi.fn(),
  destroy: vi.fn(),
  showLoading: vi.fn(),
  hideLoading: vi.fn(),
  addCredits: vi.fn(),
  redraw: vi.fn(),
  setCaption: vi.fn()
});

export const createMockProvidedChart = () => {
  const chartStubs = createMockChart();
  chartStubs.needsRedraw = vi.fn();
  return {
    chartStubs,
    needsRedraw: chartStubs.needsRedraw
  };
};

export const createMockAxis = ({ ...additional } = {}) => ({
  ...additional,
  remove: vi.fn(),
  addPlotBandOrLine: vi
    .fn()
    .mockImplementation(() => ({ options: {}, render: vi.fn() })),
  removePlotBandOrLine: vi.fn(),
  getExtremes: vi.fn(),
  setExtremes: vi.fn(),
  update: vi.fn(),
  setTitle: vi.fn(),
  plotLinesAndBands: []
});

export const createMockProvidedAxis = ({ object, ...additional }) => {
  const axisStubs = createMockAxis(additional);

  return {
    axisStubs,
    providedAxis: {
      object,
      ...additional,
      ...axisStubs
    }
  };
};

export const createMockSeries = ({ ...additional } = {}) => ({
  ...additional,
  remove: vi.fn(),
  setData: vi.fn(),
  setVisible: vi.fn(),
  update: vi.fn()
});

export const createMockProvidedSeries = ({ object, ...additional }) => {
  const seriesStubs = createMockSeries(additional);

  return {
    seriesStubs,
    getSeries: () => ({
      object,
      ...additional,
      ...seriesStubs
    })
  };
};
