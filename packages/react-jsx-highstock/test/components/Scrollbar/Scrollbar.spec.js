import React from 'react';
import { createMockProvidedChart } from '../../test-utils';
import Scrollbar from '../../../src/components/Scrollbar/Scrollbar';

describe('<Scrollbar />', function ()  {
  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart({ object: this.object });
    this.chartStubs = chartStubs;

    this.propsFromProviders = {
      getChart
    };
  });

  describe('when mounted', function () {
    it('add scrollbar using the Highcharts update method', function () {
      mount(<Scrollbar {...this.propsFromProviders} />);
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        scrollbar: {
          enabled: true
        }
      });
    });

    it('updates the scrollbar with the passed props', function () {
      mount(
        <Scrollbar barBackgroundColor="red" height={20} {...this.propsFromProviders} />
      );
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        scrollbar: {
          enabled: true,
          barBackgroundColor: 'red',
          height: 20
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(
        <Scrollbar {...this.propsFromProviders} />
      );
      wrapper.setProps({ height: 12345 });
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        scrollbar: {
          height: 12345
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the Scrollbar', function () {
      const wrapper = mount(<Scrollbar {...this.propsFromProviders} />);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        scrollbar: {
          enabled: false
        }
      })
    });
  });
});
