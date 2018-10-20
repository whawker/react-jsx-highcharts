export const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

const noop = () => {};
export const Highcharts = {
  chart: noop,
  addEvent: jest.fn(),
  removeEvent: noop,
  Tooltip: jest.fn()
};

export const createMockChart = () => ({
  addAxis: jest.fn(),
  addSeries: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  setTitle: jest.fn(),
  destroy: jest.fn(),
  showLoading: jest.fn(),
  hideLoading: jest.fn(),
  addCredits: jest.fn(),
})

export const createMockProvidedChart = () => {
  const chartStubs = createMockChart();

  return {
    chartStubs,
    getChart: () => chartStubs
  }
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
  }
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
  }
};
