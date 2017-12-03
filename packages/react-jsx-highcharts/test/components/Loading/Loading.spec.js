import React from 'react';
import Loading from '../../../src/components/Loading/Loading';

describe('<Loading />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
    this.showLoading = sinon.spy();
    this.hideLoading = sinon.spy();

    this.propsFromProviders = {
      update: this.update,
      showLoading: this.showLoading,
      hideLoading: this.hideLoading
    }
  });

  describe('when mounted', function () {
    it('displays loading message using the Highcharts showLoading method', function () {
      mount(<Loading {...this.propsFromProviders}>My Loading Message</Loading>);
      expect(this.showLoading).to.have.been.calledWith('My Loading Message');
    });

    it('does not display loading message if isLoading prop is false', function () {
      mount(<Loading {...this.propsFromProviders} isLoading={false}>My Loading Message</Loading>);
      expect(this.showLoading).not.to.have.been.called;
    });

    it('displays loading message using the Highcharts showLoading method if isLoading is true', function () {
      mount(<Loading {...this.propsFromProviders} isLoading>My Is Loading Message</Loading>);
      expect(this.showLoading).to.have.been.calledWith('My Is Loading Message');
    });

    it('updates the loading config with the passed props', function () {
      mount(
        <Loading {...this.propsFromProviders} hideDuration={2500}>Slow hiding loading</Loading>
      );
      expect(this.update).to.have.been.calledWithMatch({
        loading: {
          hideDuration: 2500
        }
      });
    });
  });

  describe('update', function () {
    it('should use the showLoading method when isLoading changes to true', function () {
      const wrapper = mount(
        <Loading {...this.propsFromProviders} isLoading={false}>Changes to true</Loading>
      );
      wrapper.setProps({ isLoading: true });
      expect(this.showLoading).to.have.been.calledWith('Changes to true');
    });

    it('should use the hideLoading method when isLoading changes to false', function () {
      const wrapper = mount(
        <Loading {...this.propsFromProviders} isLoading>Changes to true</Loading>
      );
      wrapper.setProps({ isLoading: false });
      expect(this.hideLoading).to.have.been.called;
    });

    it('should use the update method when other props change', function () {
      const wrapper = mount(
        <Loading {...this.propsFromProviders}>Updates style</Loading>
      );
      wrapper.setProps({ style: { color: 'red' } });
      expect(this.update).to.have.been.calledWithMatch({
        loading: {
          style: { color: 'red' }
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should hide the loading message', function () {
      const wrapper = mount(<Loading {...this.propsFromProviders}>My unmounting message</Loading>);
      wrapper.unmount();
      expect(this.hideLoading).to.have.been.called;
    });
  });
});
