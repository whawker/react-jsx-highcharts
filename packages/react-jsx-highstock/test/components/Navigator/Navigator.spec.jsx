import * as React from 'react';
import { render } from '@testing-library/react';

vi.mock('react-jsx-highcharts', async () => {
  const originalModule = await vi.importActual('react-jsx-highcharts');

  return {
    ...originalModule,
    useChart: vi.fn()
  };
});

import { useChart, HighchartsProvider } from 'react-jsx-highcharts';
import Navigator from '../../../src/components/Navigator/Navigator';
import { Highcharts, createMockProvidedChart } from '../../test-utils';

describe('<Navigator />', () => {
  let testContext;
  let WithProviders;

  beforeEach(() => {
    testContext = {};
    testContext.object = {
      options: { navigator: { enabled: false } }
    };
    const { chartStubs } = createMockProvidedChart({
      object: testContext.object
    });
    testContext.chartStubs = chartStubs;

    useChart.mockImplementation(() => chartStubs);

    WithProviders = ({ children }) => (
      <HighchartsProvider Highcharts={Highcharts}>
        {children}
      </HighchartsProvider>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('when mounted', () => {
    it('enables the Navigator', () => {
      render(
        <WithProviders>
          <Navigator />
        </WithProviders>
      );
      expect(testContext.object.options.navigator.enabled).toEqual(true);
    });

    it('fires the `beforeRender` event to so Highcharts creates a Navigator', () => {
      render(
        <WithProviders>
          <Navigator />
        </WithProviders>
      );
      expect(Highcharts.fireEvent).toHaveBeenCalledWith(
        testContext.object,
        'beforeRender'
      );
    });

    it('updates the chart with the passed props', () => {
      render(
        <WithProviders>
          <Navigator height={100} maskFill="rgba(1,2,3,0.45)" />
        </WithProviders>
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          navigator: {
            enabled: true,
            height: 100,
            maskFill: 'rgba(1,2,3,0.45)'
          }
        },
        true
      );
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = render(
        <WithProviders>
          <Navigator />
        </WithProviders>
      );
      wrapper.rerender(
        <WithProviders>
          <Navigator maskInside={false} />
        </WithProviders>
      );

      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          navigator: {
            maskInside: false
          }
        },
        expect.any(Boolean)
      );
    });
  });

  describe('when unmounted', () => {
    it('should disable the Navigator', () => {
      const wrapper = render(
        <WithProviders>
          <Navigator />
        </WithProviders>
      );
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          navigator: {
            enabled: false
          }
        },
        expect.any(Boolean)
      );
    });
  });
});
