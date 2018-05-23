import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Subtitle from '../../../src/components/Subtitle/Subtitle';

describe('<Subtitle />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  context('when mounted', function () {
    it('adds a subtitle using the Highcharts setTitle method', function () {
      mount(<Subtitle {...this.propsFromProviders}>My Subtitle</Subtitle>);
      expect(this.chartStubs.setTitle).to.have.been.calledWithMatch(
        null, { text: 'My Subtitle' }, true
      );
    });

    it('should pass additional props through to Highcharts setTitle method', function () {
      mount(<Subtitle align="right" {...this.propsFromProviders}>My Other Subtitle</Subtitle>);
      expect(this.chartStubs.setTitle).to.have.been.calledWithMatch(
        null, { text: 'My Other Subtitle', align: 'right' }, true
      );
    });
  });

  context('update', function () {
    it('should use the setTitle method when the data changes', function () {
      const wrapper = mount(
        <Subtitle {...this.propsFromProviders}>My Subtitle</Subtitle>
      );
      wrapper.setProps({ x: 10, y: 20, children: 'My New Subtitle' });
      expect(this.chartStubs.setTitle).to.have.been.calledWith(null, { x: 10, y: 20, text: 'My New Subtitle' }, true);
    });
  });

  context('when unmounted', function () {
    it('removes the subtitle by setting the subtitle to text', function () {
      const wrapper = mount(<Subtitle {...this.propsFromProviders}>My Subtitle</Subtitle>);
      wrapper.unmount();
      expect(this.chartStubs.setTitle).to.have.been.calledWith(null, { text: null }, true);
    });
  });
});
