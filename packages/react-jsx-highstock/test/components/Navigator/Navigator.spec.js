import React from 'react';
import Navigator from '../../../src/components/Navigator/Navigator';
import { Highcharts, createMockProvidedChart } from '../../test-utils';

describe('<Navigator />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.object = {
      options: { navigator: { enabled: false } }
    };
    const { chartStubs, getChart } = createMockProvidedChart({ object: testContext.object });
    testContext.chartStubs = chartStubs;

    testContext.propsFromProviders = {
      getChart,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('when mounted', () => {
    it('enables the Navigator', () => {
      mount(<Navigator {...testContext.propsFromProviders} />);
      expect(testContext.object.options.navigator.enabled).toEqual(true);
    });

    it('fires the `beforeRender` event to so Highcharts creates a Navigator', () => {
      mount(<Navigator {...testContext.propsFromProviders} />);
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(testContext.object, 'beforeRender');
    });

    it('updates the chart with the passed props', () => {
      mount(<Navigator height={100} maskFill="rgba(1,2,3,0.45)" {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(expect.objectContaining({
        navigator: {
          enabled: true,
          height: 100,
          maskFill: 'rgba(1,2,3,0.45)'
        }
      }), expect.any(Boolean));
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<Navigator {...testContext.propsFromProviders} />);
      wrapper.setProps({ maskInside: false });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        navigator: {
          maskInside: false
        }
      }, expect.any(Boolean));
    });
  });

  describe('when unmounted', () => {
    it('should disable the Navigator', () => {
      const wrapper = mount(<Navigator {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        navigator: {
          enabled: false
        }
      }, expect.any(Boolean))
    });
  });
});
