import sinon from 'sinon';

const noop = () => {};
export const Highcharts = {
  stockChart: noop,
  addEvent: noop,
  removeEvent: noop,
  fireEvent: noop
};

export const createMockChart = ({ ...additional }) => ({
  ...additional,
  addAxis: sinon.stub(),
  addSeries: sinon.stub(),
  get: sinon.stub(),
  update: sinon.stub(),
  setTitle: sinon.stub(),
  destroy: sinon.stub(),
  showLoading: sinon.stub(),
  hideLoading: sinon.stub()
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

