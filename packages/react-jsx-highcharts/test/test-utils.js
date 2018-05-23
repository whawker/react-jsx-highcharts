import sinon from 'sinon';

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
  hideLoading: sinon.stub()
})

export const createMockProvidedChart = () => {
  const chartStubs = createMockChart();

  return {
    chartStubs,
    getChart: () => chartStubs
  }
};

export const createMockAxis = ({ id, type }) => ({
  id,
  type,
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

export const createMockProvidedAxis = ({ id, type, object }) => {
  const axisStubs = createMockAxis({ id, type });

  return {
    axisStubs,
    getAxis: () => ({
      object,
      id,
      type,
      ...axisStubs
    })
  }
};

export const createMockSeries = () => ({
  remove: sinon.stub(),
  setData: sinon.stub(),
  setVisible: sinon.stub(),
  update: sinon.stub()
});

export const createMockProvidedSeries = () => {
  const seriesStubs = createMockSeries();

  return {
    seriesStubs,
    getSeries: () => seriesStubs
  }
};

