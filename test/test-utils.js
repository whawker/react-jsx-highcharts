import sinon from 'sinon';

export const createMockAxis = () => ({
  remove: sinon.spy(),
  update: sinon.spy()
});

export const createMockSeries = () => ({
  remove: sinon.spy(),
  setData: sinon.spy(),
  setVisible: sinon.spy(),
  update: sinon.spy()
});

export const createMockChart = getStub => ({
  addAxis: sinon.spy(),
  addSeries: sinon.spy(),
  get: getStub
});
