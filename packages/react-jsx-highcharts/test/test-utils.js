export const uuidRegex =
  /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

const noop = () => {};
export const Highcharts = {
  chart: jest.fn(),
  addEvent: jest.fn(),
  removeEvent: jest.fn(),
  Tooltip: jest.fn().mockImplementation(() => ({ update: jest.fn() }))
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
  setCaption: jest.fn()
});

export const createMockProvidedChart = () => {
  const chartStubs = createMockChart();
  chartStubs.needsRedraw = jest.fn();
  return {
    chartStubs,
    needsRedraw: chartStubs.needsRedraw
  };
};

export const createMockAxis = ({ ...additional }) => ({
  ...additional,
  remove: jest.fn(),
  addPlotBandOrLine: jest
    .fn()
    .mockImplementation(() => ({ options: {}, render: jest.fn() })),
  removePlotBandOrLine: jest.fn(),
  getExtremes: jest.fn(),
  setExtremes: jest.fn(),
  update: jest.fn(),
  setTitle: jest.fn(),
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
