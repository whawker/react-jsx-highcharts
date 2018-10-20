import React from 'react';
import { createMockProvidedChart } from '../../test-utils'
import Loading from '../../../src/components/Loading/Loading';

describe('<Loading />', () => {
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
    it('displays loading message using the Highcharts showLoading method', () => {
      mount(<Loading {...testContext.propsFromProviders}>My Loading Message</Loading>);
      expect(testContext.chartStubs.showLoading).to.have.been.calledWith('My Loading Message');
    });

    it('does not display loading message if isLoading prop is false', () => {
      mount(<Loading {...testContext.propsFromProviders} isLoading={false}>My Loading Message</Loading>);
      expect(testContext.chartStubs.showLoading).not.to.have.been.called;
    });

    it('displays loading message using the Highcharts showLoading method if isLoading is true', () => {
      mount(<Loading {...testContext.propsFromProviders} isLoading>My Is Loading Message</Loading>);
      expect(testContext.chartStubs.showLoading).to.have.been.calledWith('My Is Loading Message');
    });

    it('updates the loading config with the passed props', () => {
      mount(
        <Loading {...testContext.propsFromProviders} hideDuration={2500}>Slow hiding loading</Loading>
      );
      expect(testContext.chartStubs.update).to.have.been.calledWithMatch({
        loading: {
          hideDuration: 2500
        }
      });
    });
  });

  describe('update', () => {
    it('should use the showLoading method when isLoading changes to true', () => {
      const wrapper = mount(
        <Loading {...testContext.propsFromProviders} isLoading={false}>Changes to true</Loading>
      );
      wrapper.setProps({ isLoading: true });
      expect(testContext.chartStubs.showLoading).to.have.been.calledWith('Changes to true');
    });

    it('should use the hideLoading method when isLoading changes to false', () => {
      const wrapper = mount(
        <Loading {...testContext.propsFromProviders} isLoading>Changes to true</Loading>
      );
      wrapper.setProps({ isLoading: false });
      expect(testContext.chartStubs.hideLoading).to.have.been.called;
    });

    it('should use the update method when other props change', () => {
      const wrapper = mount(
        <Loading {...testContext.propsFromProviders}>Updates style</Loading>
      );
      wrapper.setProps({ style: { color: 'red' } });
      expect(testContext.chartStubs.update).to.have.been.calledWithMatch({
        loading: {
          style: { color: 'red' }
        }
      });
    });
  });

  describe('when unmounted', () => {
    it('should hide the loading message', () => {
      const wrapper = mount(<Loading {...testContext.propsFromProviders}>My unmounting message</Loading>);
      wrapper.unmount();
      expect(testContext.chartStubs.hideLoading).to.have.been.called;
    });
  });
});
