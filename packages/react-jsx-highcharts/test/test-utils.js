import sinon from 'sinon';

export const uuidRegex = /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i

const noop = () => {};
export const Highcharts = {
  chart: noop,
  addEvent: noop,
  removeEvent: noop,
  Tooltip: noop
};

export const createMockChart = () => ({
  addAxis: sinon.stub(),
  addSeries: sinon.stub(),
  get: sinon.stub(),
  update: sinon.stub(),
  setTitle: sinon.stub(),
  destroy: sinon.stub(),
  showLoading: sinon.stub(),
  hideLoading: sinon.stub(),
  addCredits: sinon.stub(),
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
  remove: sinon.stub(),
  addPlotBand: sinon.stub(),
  removePlotBand: sinon.stub(),
  addPlotLine: sinon.stub(),
  removePlotLine: sinon.stub(),
  getExtremes: sinon.stub(),
  setExtremes: sinon.stub(),
  update: sinon.stub(),
  setTitle: sinon.stub()
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
  remove: sinon.stub(),
  setData: sinon.stub(),
  setVisible: sinon.stub(),
  update: sinon.stub()
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

