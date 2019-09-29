import React from 'react';
import { createMockProvidedChart } from '../../test-utils';
import Scrollbar from '../../../src/components/Scrollbar/Scrollbar';
import { HighchartsChartContext } from 'react-jsx-highcharts';

describe('<Scrollbar />', () => {
  let testContext;
  let ProvidedScrollBar;

  beforeEach(() => {
    testContext = {};
    const { chartStubs } = createMockProvidedChart({ object: testContext.object });
    testContext.chartStubs = chartStubs;

    ProvidedScrollBar = props => (
      <HighchartsChartContext.Provider value={ chartStubs }>
        <Scrollbar {...props} />
      </HighchartsChartContext.Provider>
    )
  });

  describe('when mounted', () => {
    it('add scrollbar using the Highcharts update method', () => {
      mount(<ProvidedScrollBar />);
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: {
          enabled: true
        }
      }, true);
    });

    it('updates the scrollbar with the passed props', () => {
      mount(
        <ProvidedScrollBar barBackgroundColor="red" height={20} />
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: {
          enabled: true,
          barBackgroundColor: 'red',
          height: 20
        }
      }, true);
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(
        <ProvidedScrollBar />
      );
      wrapper.setProps({ height: 12345 });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: {
          height: 12345
        }
      }, true);
    });
  });

  describe('when unmounted', () => {
    it('should disable the Scrollbar', () => {
      const wrapper = mount(<ProvidedScrollBar />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).toHaveBeenCalledWith({
        scrollbar: {
          enabled: false
        }
      }, true)
    });
  });
});
