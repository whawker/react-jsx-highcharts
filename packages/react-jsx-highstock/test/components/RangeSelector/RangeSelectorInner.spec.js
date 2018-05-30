import React from 'react';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis } from '../../test-utils';
import { _RangeSelectorInner as RangeSelectorInner } from '../../../src/components/RangeSelector/RangeSelectorInner';

describe('<RangeSelectorInner />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.object = {
      options: { rangeSelector: { enabled: false } }
    };
    const { chartStubs, getChart } = createMockProvidedChart({ object: this.object });
    this.chartStubs = chartStubs;

    this.axisObject = {};
    const { axisStubs, getAxis } = createMockProvidedAxis({ object: this.axisObject });
    this.axisStubs = axisStubs;

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'fireEvent');
    sandbox.stub(Highcharts, 'addEvent');

    this.propsFromProviders = {
      getChart,
      getAxis,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('enables the RangeSelector', function () {
      mount(<RangeSelectorInner {...this.propsFromProviders} />);
      expect(this.object.options.rangeSelector.enabled).to.equal(true);
    });

    it('fires the initialization event to so Highcharts creates a RangeSelector', function () {
      mount(<RangeSelectorInner {...this.propsFromProviders} />);
      expect(Highcharts.fireEvent).to.have.been.calledWith(this.object, 'init');
      expect(Highcharts.fireEvent).to.have.been.calledWith(this.object, 'afterGetContainer');
    });

    it('updates the chart with the passed props', function () {
      mount(<RangeSelectorInner height={100} buttonSpacing={2} {...this.propsFromProviders} />);
      expect(this.chartStubs.update).to.have.been.calledWithMatch({
        rangeSelector: {
          enabled: true,
          inputEnabled: false,
          height: 100,
          buttonSpacing: 2
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<RangeSelectorInner selected={0} {...this.propsFromProviders} />);
      wrapper.setProps({ selected: 2 });
      expect(this.chartStubs.update).to.have.been.calledWith({
        rangeSelector: {
          selected: 2
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the RangeSelector', function () {
      const wrapper = mount(<RangeSelectorInner {...this.propsFromProviders} />);
      wrapper.unmount();
      expect(this.chartStubs.update).to.have.been.calledWith({
        rangeSelector: {
          enabled: false
        }
      })
    });
  });
});
