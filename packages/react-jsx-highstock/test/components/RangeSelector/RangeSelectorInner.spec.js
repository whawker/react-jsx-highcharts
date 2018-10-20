import React from 'react';
import { Highcharts, createMockProvidedChart, createMockProvidedAxis } from '../../test-utils';
import { _RangeSelectorInner as RangeSelectorInner } from '../../../src/components/RangeSelector/RangeSelectorInner';

describe('<RangeSelectorInner />', () => {
  let testContext;

  let sandbox;

  beforeEach(() => {
    testContext = {};
    testContext.object = {
      options: { rangeSelector: { enabled: false } }
    };
    const { chartStubs, getChart } = createMockProvidedChart({ object: testContext.object });
    testContext.chartStubs = chartStubs;

    testContext.axisObject = {};
    const { axisStubs, getAxis } = createMockProvidedAxis({ object: testContext.axisObject });
    testContext.axisStubs = axisStubs;

    sandbox = sinon.createSandbox();
    sandbox.stub(Highcharts, 'fireEvent');
    sandbox.stub(Highcharts, 'addEvent');

    testContext.propsFromProviders = {
      getChart,
      getAxis,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('when mounted', () => {
    it('enables the RangeSelector', () => {
      mount(<RangeSelectorInner {...testContext.propsFromProviders} />);
      expect(testContext.object.options.rangeSelector.enabled).to.equal(true);
    });

    it('fires the initialization event to so Highcharts creates a RangeSelector', () => {
      mount(<RangeSelectorInner {...testContext.propsFromProviders} />);
      expect(Highcharts.fireEvent).to.have.been.calledWith(testContext.object, 'init');
      expect(Highcharts.fireEvent).to.have.been.calledWith(testContext.object, 'afterGetContainer');
    });

    it('updates the chart with the passed props', () => {
      mount(<RangeSelectorInner height={100} buttonSpacing={2} {...testContext.propsFromProviders} />);
      expect(testContext.chartStubs.update).to.have.been.calledWithMatch({
        rangeSelector: {
          enabled: true,
          inputEnabled: false,
          height: 100,
          buttonSpacing: 2
        }
      });
    });
  });

  describe('update', () => {
    it('should use the update method when props change', () => {
      const wrapper = mount(<RangeSelectorInner selected={0} {...testContext.propsFromProviders} />);
      wrapper.setProps({ selected: 2 });
      expect(testContext.chartStubs.update).to.have.been.calledWith({
        rangeSelector: {
          selected: 2
        }
      });
    });
  });

  describe('when unmounted', () => {
    it('should disable the RangeSelector', () => {
      const wrapper = mount(<RangeSelectorInner {...testContext.propsFromProviders} />);
      wrapper.unmount();
      expect(testContext.chartStubs.update).to.have.been.calledWith({
        rangeSelector: {
          enabled: false
        }
      })
    });
  });
});
