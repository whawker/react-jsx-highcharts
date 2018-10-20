import React from 'react';
import { createMockProvidedChart } from '../../test-utils';
import Scrollbar from '../../../src/components/Scrollbar/Scrollbar';

describe('<Scrollbar />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    const { chartStubs, getChart } = createMockProvidedChart({ object: testContext.object });
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart
    };
  });

  describe('when mounted', () => {
    it('add scrollbar using the Highcharts update method', () => {
      mount(<Scrollbar {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: expect.objectContaining({
          enabled: true
        })
      }, expect.any(Boolean));
    });

    it('updates the scrollbar with the passed props', () => {
      mount(
        <Scrollbar barBackgroundColor="red" height={20} {...testContext.propsFromProviders} />
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: expect.objectContaining({
          enabled: true,
          barBackgroundColor: 'red',
          height: 20
        })
      }, expect.any(Boolean));
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(
        <Scrollbar {...testContext.propsFromProviders} />
      );
      wrapper.setProps({ height: 12345 });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: expect.objectContaining({
          height: 12345
        })
      }, expect.any(Boolean));
    });
  });

  describe('when unmounted', () => {
    it('should disable the Scrollbar', () => {
      const wrapper = mount(<Scrollbar {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: expect.objectContaining({
          enabled: false
        })
      }, expect.any(Boolean))
    });
  });
});
