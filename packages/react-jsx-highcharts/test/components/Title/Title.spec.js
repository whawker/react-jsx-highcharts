import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Title from '../../../src/components/Title/Title';

describe('<Title />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart
    };
  });

  describe('when mounted', () => {
    it('adds a title using the Highcharts setTitle method', () => {
      mount(<Title {...testContext.propsFromProviders}>My Title</Title>);
      expect(testContext.chartStubs.setTitle).to.have.been.calledWithMatch(
        { text: 'My Title' }, null, true
      );
    });

    it('should pass additional props through to Highcharts setTitle method', () => {
      mount(<Title align="right" {...testContext.propsFromProviders}>My Other Title</Title>);
      expect(testContext.chartStubs.setTitle).to.have.been.calledWithMatch(
        { text: 'My Other Title', align: 'right' }, null, true
      );
    });
  });

  describe('update', () => {
    it('should use the setTitle method when the data changes', () => {
      const wrapper = mount(
        <Title {...testContext.propsFromProviders}>My Title</Title>
      );
      wrapper.setProps({ x: 10, y: 20, children: 'My New Title' });
      expect(testContext.chartStubs.setTitle).to.have.been.calledWith({ x: 10, y: 20, text: 'My New Title' }, null, true);
    });
  });

  describe('when unmounted', () => {
    it('removes the title by setting the title to text', () => {
      const wrapper = mount(<Title {...testContext.propsFromProviders}>My Title</Title>);
      wrapper.unmount();
      expect(testContext.chartStubs.setTitle).to.have.been.calledWith({ text: null }, null, true);
    });
  });
});
