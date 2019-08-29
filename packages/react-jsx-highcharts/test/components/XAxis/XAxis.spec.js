import React from 'react';
import XAxis from '../../../src/components/XAxis/XAxis';
import Axis from '../../../src/components/Axis';
import { Provider } from '../../../src/components/ChartContext';
import { createMockProvidedChart } from '../../test-utils'

describe('<XAxis />', () => {
  let testContext;
  let ProvidedAxis;
  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart, needsRedraw } = createMockProvidedChart({ type: 'chart' });
    testContext.chartStubs = chartStubs;

    ProvidedAxis = (props) => (
      <Provider value={{ getChart, needsRedraw }}>
        <XAxis {...props}/>
      </Provider>
    );

  });

  it('renders an <Axis />', () => {
    const wrapper = mount(<ProvidedAxis />);
    const axis = wrapper.find(Axis);
    expect(axis).toExist();
  });

  it('renders an <Axis isX />', () => {
    const wrapper = mount(<ProvidedAxis />);
    const axis = wrapper.find(Axis);
    expect(axis).toHaveProp('isX', true);
  });

  it('passes other props through to <Axis />', () => {
    const wrapper = mount(<ProvidedAxis tickLength={1337} />);
    const axis = wrapper.find(Axis);
    expect(axis).toHaveProp('tickLength', 1337);
  });

  describe('Highcharts chart', () => {
    beforeEach(() => {
      testContext.chartStubs.type = 'chart';
    });

    it('renders the <Axis /> type if provided', () => {
      const wrapper = mount(<ProvidedAxis  type="logarithmic"/>);
      const axis = wrapper.find(Axis);
      expect(axis).toHaveProp('type','logarithmic');
    });

    it('renders the an <Axis type="linear" /> if no type specified', () => {
      const wrapper = mount(<ProvidedAxis {...testContext.propsFromProviders} />);
      const axis = wrapper.find(Axis);
      expect(axis).toHaveProp('type','linear');
    });

    it('uses the id prop if provided', () => {
      const wrapper = mount(<ProvidedAxis id='myXAxisId' />);
      const axis = wrapper.find(Axis);
      expect(axis).toHaveProp('id', 'myXAxisId');
    });

    it('does not create an id if id prop not provided', () => {
      const wrapper = mount(<ProvidedAxis />);
      const axis = wrapper.find(Axis);
      expect(axis.props().id).not.toBeDefined();
    });
  });

  describe('Highstock chart', () => {
    beforeEach(() => {
      testContext.chartStubs.type = 'stockChart';
    });

    it('renders the <Axis /> type if provided', () => {
      const wrapper = mount(<ProvidedAxis  type="logarithmic"/>);
      const axis = wrapper.find(Axis);
      expect(axis).toHaveProp('type','logarithmic');
    });

    it('renders the an <Axis type="datetime" /> if no type specified', () => {
      const wrapper = mount(<ProvidedAxis />);
      const axis = wrapper.find(Axis);
      expect(axis).toHaveProp('type','datetime');
    });

    it('uses the id `xAxis` even if an id prop is provided', () => {
      const wrapper = mount(<ProvidedAxis id='myXAxisId' />);
      const axis = wrapper.find(Axis);
      expect(axis).toHaveProp('id', 'xAxis');
    });

    it('uses the id `xAxis` if id prop not provided', () => {
      const wrapper = mount(<ProvidedAxis />);
      const axis = wrapper.find(Axis);
      expect(axis).toHaveProp('id', 'xAxis');
    });
  })
});
