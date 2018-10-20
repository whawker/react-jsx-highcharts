import React from 'react';
import XAxis from '../../../src/components/XAxis/XAxis';
import Axis from '../../../src/components/Axis';
import { createMockProvidedChart } from '../../test-utils'

describe('<XAxis />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart({ type: 'chart' });
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart
    };
  });

  it('renders an <Axis />', () => {
    const wrapper = shallow(<XAxis {...testContext.propsFromProviders} />);
    expect(wrapper.type()).toBe(Axis);
  });

  it('renders an <Axis isX />', () => {
    const wrapper = shallow(<XAxis {...testContext.propsFromProviders} />);
    expect(wrapper).toHaveProp('isX', true);
  });

  it('passes other props through to <Axis />', () => {
    const wrapper = shallow(<XAxis {...testContext.propsFromProviders} tickLength={1337} />);
    expect(wrapper).toHaveProp('tickLength', 1337);
  });

  describe('Highcharts chart', () => {
    beforeEach(() => {
      testContext.chartStubs.type = 'chart';
    });

    it('renders the <Axis /> type if provided', () => {
      const wrapper = shallow(<XAxis {...testContext.propsFromProviders} type="logarithmic"/>);
      expect(wrapper).toHaveProp('type','logarithmic');
    });

    it('renders the an <Axis type="linear" /> if no type specified', () => {
      const wrapper = shallow(<XAxis {...testContext.propsFromProviders} />);
      expect(wrapper).toHaveProp('type','linear');
    });

    it('uses the id prop if provided', () => {
      const wrapper = shallow(<XAxis id='myXAxisId' {...testContext.propsFromProviders} />);
      expect(wrapper).toHaveProp('id', 'myXAxisId');
    });

    it('does not create an id if id prop not provided', () => {
      const wrapper = shallow(<XAxis {...testContext.propsFromProviders} />);
      expect(wrapper.props().id).not.toBeDefined();
    });
  });

  describe('Highstock chart', () => {
    beforeEach(() => {
      testContext.chartStubs.type = 'stockChart';
    });

    it('renders the <Axis /> type if provided', () => {
      const wrapper = shallow(<XAxis {...testContext.propsFromProviders} type="logarithmic"/>);
      expect(wrapper).toHaveProp('type','logarithmic');
    });

    it('renders the an <Axis type="datetime" /> if no type specified', () => {
      const wrapper = shallow(<XAxis {...testContext.propsFromProviders} />);
      expect(wrapper).toHaveProp('type','datetime');
    });

    it('uses the id `xAxis` even if an id prop is provided', () => {
      const wrapper = shallow(<XAxis id='myXAxisId' {...testContext.propsFromProviders} />);
      expect(wrapper).toHaveProp('id', 'xAxis');
    });

    it('uses the id `xAxis` if id prop not provided', () => {
      const wrapper = shallow(<XAxis {...testContext.propsFromProviders} />);
      expect(wrapper).toHaveProp('id', 'xAxis');
    });
  })
});
