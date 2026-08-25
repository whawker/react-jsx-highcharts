export const uuidRegex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const Highcharts = {
  mapChart: vi.fn(),
  addEvent: vi.fn(),
  removeEvent: vi.fn(),
  maps: {
    'mock/map': { some: 'data' }
  },
  format: vi.fn()
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
  setCaption: vi.fn(),
  options: { credits: {} }
});

export const createMockProvidedChart = ({ object, ...additional }) => {
  const chartStubs = createMockChart(additional);

  return {
    chartStubs: { ...chartStubs, object }
  };
};

export const createMockAxis = ({ ...additional }) => ({
  ...additional,
  remove: vi.fn(),
  addPlotBand: vi.fn(),
  removePlotBand: vi.fn(),
  addPlotLine: vi.fn(),
  removePlotLine: vi.fn(),
  getExtremes: vi.fn(),
  setExtremes: vi.fn(),
  update: vi.fn(),
  setTitle: vi.fn()
});

export const createMockProvidedAxis = ({ object, ...additional }) => {
  const axisStubs = createMockAxis(additional);

  return {
    axisStubs,
    getAxis: () => ({
      object,
      ...additional,
      ...axisStubs
    })
  };
};

export const createMockSeries = ({ ...additional }) => ({
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
