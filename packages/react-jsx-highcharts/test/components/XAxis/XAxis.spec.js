import React from 'react';
import XAxis from '../../../src/components/XAxis/XAxis';
import Axis from '../../../src/components/Axis';
import { createMockProvidedChart } from '../../test-utils'

describe('<XAxis />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart({ type: 'chart' });
    this.chartStubs = chartStubs;

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
      this.chartStubs.type = 'chart';
    });

    it('renders the <Axis /> type if provided', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} type="logarithmic"/>);
      expect(wrapper).to.have.prop('type').equal('logarithmic');
    });

    it('renders the an <Axis type="linear" /> if no type specified', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
      expect(wrapper).to.have.prop('type').equal('linear');
    });

    it('uses the id prop if provided', function () {
      const wrapper = shallow(<XAxis id='myXAxisId' {...this.propsFromProviders} />);
      expect(wrapper).to.have.prop('id').equal('myXAxisId');
    });

    it('does not create an id if id prop not provided', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
      expect(wrapper).not.to.have.prop('id');
    });
  });

  describe('Highstock chart', function () {
    beforeEach(function () {
      this.chartStubs.type = 'stockChart';
    });

    it('renders the <Axis /> type if provided', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} type="logarithmic"/>);
      expect(wrapper).to.have.prop('type').equal('logarithmic');
    });

    it('renders the an <Axis type="datetime" /> if no type specified', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
      expect(wrapper).to.have.prop('type').equal('datetime');
    });

    it('uses the id `xAxis` even if an id prop is provided', function () {
      const wrapper = shallow(<XAxis id='myXAxisId' {...this.propsFromProviders} />);
      expect(wrapper).to.have.prop('id').equal('xAxis');
    });

    it('uses the id `xAxis` if id prop not provided', function () {
      const wrapper = shallow(<XAxis {...this.propsFromProviders} />);
      expect(wrapper).to.have.prop('id').equal('xAxis');
    });
  })
});
