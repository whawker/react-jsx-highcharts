import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Title from '../../../src/components/Title/Title';

describe('<Title />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  context('when mounted', function () {
    it('adds a title using the Highcharts setTitle method', function () {
      mount(<Title {...this.propsFromProviders}>My Title</Title>);
      expect(this.chartStubs.setTitle).to.have.been.calledWithMatch(
        { text: 'My Title' }, null, true
      );
    });

    it('should pass additional props through to Highcharts setTitle method', function () {
      mount(<Title align="right" {...this.propsFromProviders}>My Other Title</Title>);
      expect(this.chartStubs.setTitle).to.have.been.calledWithMatch(
        { text: 'My Other Title', align: 'right' }, null, true
      );
    });
  });

  context('update', function () {
    it('should use the setTitle method when the data changes', function () {
      const wrapper = mount(
        <Title {...this.propsFromProviders}>My Title</Title>
      );
      wrapper.setProps({ x: 10, y: 20, children: 'My New Title' });
      expect(this.chartStubs.setTitle).to.have.been.calledWith({ x: 10, y: 20, text: 'My New Title' }, null, true);
    });
  });

  context('when unmounted', function () {
    it('removes the title by setting the title to text', function () {
      const wrapper = mount(<Title {...this.propsFromProviders}>My Title</Title>);
      wrapper.unmount();
      expect(this.chartStubs.setTitle).to.have.been.calledWith({ text: null }, null, true);
    });
  });
});
