export const uuidRegex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

export const Highcharts = {
  mapChart: jest.fn(),
  addEvent: jest.fn(),
  removeEvent: jest.fn(),
  maps: {
    'mock/map': { some: 'data' }
  },
  format: jest.fn()
};

export const createMockChart = () => ({
  addAxis: jest.fn(),
  addColorAxis: jest.fn(),
  addSeries: jest.fn(),
  get: jest.fn(),
  setSize: jest.fn(),
  update: jest.fn(),
  setTitle: jest.fn(),
  destroy: jest.fn(),
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  addCredits: jest.fn(),
  redraw: jest.fn(),
  setCaption: jest.fn(),
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
  remove: jest.fn(),
  addPlotBand: jest.fn(),
  removePlotBand: jest.fn(),
  addPlotLine: jest.fn(),
  removePlotLine: jest.fn(),
  getExtremes: jest.fn(),
  setExtremes: jest.fn(),
  update: jest.fn(),
  setTitle: jest.fn()
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
  remove: jest.fn(),
  setData: jest.fn(),
  setVisible: jest.fn(),
  update: jest.fn()
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
