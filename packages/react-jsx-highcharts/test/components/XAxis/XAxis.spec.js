import React from 'react';
import XAxis from '../../../src/components/XAxis/XAxis';
import Axis from '../../../src/components/Axis';
import { createMockProvidedChart } from '../../test-utils'

describe('<XAxis />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;
    this.chartStubs.getType = sinon.stub();

    this.propsFromProviders = {
      getChart
    };
  });

  it('renders an <Axis />', function ()  {
    const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
    expect(wrapper).to.have.type(Axis);
  });

  it('renders an <Axis isX />', function () {
    const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
    expect(wrapper).to.have.prop('isX').equal(true);
  });

  it('passes other props through to <Axis />', function () {
    const wrapper = shallow(<XAxis {...this.propsFromProviders} tickLength={1337} />);
    expect(wrapper).to.have.prop('tickLength').equal(1337);
  });

  describe('Highcharts chart', function () {
    beforeEach(function () {
      this.chartStubs.getType.returns('chart');
    });

    it('renders the <Axis /> type if provided', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} type="logarithmic"/>);
      expect(wrapper).to.have.prop('type').equal('logarithmic');
    });

    it('renders the an <Axis type="linear" /> if no type specified', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
      expect(wrapper).to.have.prop('type').equal('linear');
    });
  });

  describe('Highstock chart', function () {
    beforeEach(function () {
      this.chartStubs.getType.returns('stockChart');
    });

    it('renders the <Axis /> type if provided', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} type="logarithmic"/>);
      expect(wrapper).to.have.prop('type').equal('logarithmic');
    });

    it('renders the an <Axis type="datetime" /> if no type specified', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
      expect(wrapper).to.have.prop('type').equal('datetime');
    });
  })
});
