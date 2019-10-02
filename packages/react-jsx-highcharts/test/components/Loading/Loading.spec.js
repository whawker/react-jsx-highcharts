import React from 'react';
import { createMockProvidedChart } from '../../test-utils';
import Loading from '../../../src/components/Loading/Loading';
import ChartContext from '../../../src/components/ChartContext';

describe('<Loading />', () => {
  let testContext;
  let ProvidedLoading;
  beforeEach(() => {
    testContext = {};
    const { chartStubs } = createMockProvidedChart();
    testContext.chartStubs = chartStubs;
    ProvidedLoading = props => (
      <ChartContext.Provider value={chartStubs}>
        <Loading {...props} />
      </ChartContext.Provider>
    );
  });

  describe('when mounted', () => {
    it('displays loading message using the Highcharts showLoading method', () => {
      mount(<ProvidedLoading>My Loading Message</ProvidedLoading>);
      expect(testContext.chartStubs.showLoading).toHaveBeenCalledWith(
        'My Loading Message'
      );
    });

    it('does not display loading message if isLoading prop is false', () => {
      mount(
        <ProvidedLoading isLoading={false}>My Loading Message</ProvidedLoading>
      );
      expect(testContext.chartStubs.showLoading).not.toHaveBeenCalled();
    });

    it('displays loading message using the Highcharts showLoading method if isLoading is true', () => {
      mount(<ProvidedLoading isLoading>My Is Loading Message</ProvidedLoading>);
      expect(testContext.chartStubs.showLoading).toHaveBeenCalledWith(
        'My Is Loading Message'
      );
    });

    it('updates the loading config with the passed props', () => {
      mount(
        <ProvidedLoading hideDuration={2500}>
          Slow hiding loading
        </ProvidedLoading>
      );
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          loading: {
            hideDuration: 2500
          }
        },
        true
      );
    });
  });

  describe('update', () => {
    it('should use the showLoading method when isLoading changes to true', () => {
      const wrapper = mount(
        <ProvidedLoading isLoading={false}>Changes to true</ProvidedLoading>
      );
      wrapper.setProps({ isLoading: true });
      expect(testContext.chartStubs.showLoading).toHaveBeenCalledWith(
        'Changes to true'
      );
    });

    it('should use the hideLoading method when isLoading changes to false', () => {
      const wrapper = mount(
        <ProvidedLoading isLoading>Changes to true</ProvidedLoading>
      );
      wrapper.setProps({ isLoading: false });
      expect(testContext.chartStubs.hideLoading).toHaveBeenCalled();
    });

    it('should use the update method when other props change', () => {
      const wrapper = mount(<ProvidedLoading>Updates style</ProvidedLoading>);
      wrapper.setProps({ style: { color: 'red' } });
      expect(testContext.chartStubs.update).toHaveBeenCalledWith(
        {
          loading: {
            style: { color: 'red' }
          }
        },
        true
      );
    });
  });

  describe('when unmounted', () => {
    it('should hide the loading message', () => {
      const wrapper = mount(
        <ProvidedLoading>My unmounting message</ProvidedLoading>
      );
      wrapper.unmount();
      expect(testContext.chartStubs.hideLoading).toHaveBeenCalled();
    });
  });
});
