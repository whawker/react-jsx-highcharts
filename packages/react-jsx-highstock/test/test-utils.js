const noop = () => {};
export const Highcharts = {
  stockChart: noop,
  addEvent: jest.fn(),
  removeEvent: noop,
  fireEvent: jest.fn()
};

export const createMockChart = ({ ...additional }) => ({
  ...additional,
  addAxis: jest.fn(),
  addSeries: jest.fn(),
  get: jest.fn(),
  update: jest.fn(),
  setTitle: jest.fn(),
  destroy: jest.fn(),
  showLoading: jest.fn(),
  hideLoading: jest.fn()
})

export const createMockProvidedChart = ({ object, ...additional }) => {
  const chartStubs = createMockChart(additional);

  return {
    chartStubs,
    getChart: () => ({
      object,
      ...additional,
      ...chartStubs
    })
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
