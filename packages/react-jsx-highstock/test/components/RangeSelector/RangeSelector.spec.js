import React from 'react';
import RangeSelector from '../../../src/components/RangeSelector/RangeSelector';
import { Highcharts, createMockChart, createMockAxis } from '../../test-utils';

describe('<RangeSelector />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.update = sinon.spy();
    this.xAxis = createMockAxis();
    this.xAxis.getExtremes.returns({ min: undefined, max: undefined });
    this.chart = createMockChart();
    this.chart.xAxis = [this.xAxis];
    this.getChart = sinon.stub();
    this.getChart.returns(this.chart);

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'RangeSelector');
    sandbox.stub(Highcharts, 'addEvent');

    this.propsFromProviders = {
      update: this.update,
      getChart: this.getChart,
      getHighcharts: () => Highcharts
    };
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('creates a new Highcharts RangeSelector instance', function () {
      mount(<RangeSelector {...this.propsFromProviders} />);
      expect(Highcharts.RangeSelector).to.have.been.calledWithNew;
      expect(Highcharts.RangeSelector).to.have.been.calledWith(this.chart);
    });

    it('updates the chart with the passed props', function () {
      mount(<RangeSelector height={100} buttonSpacing={2} {...this.propsFromProviders} />);
      expect(this.update).to.have.been.calledWithMatch({
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
      const wrapper = mount(<RangeSelector selected={0} {...this.propsFromProviders} />);
      wrapper.setProps({ selected: 2 });
      expect(this.update).to.have.been.calledWith({
        rangeSelector: {
          selected: 2
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the RangeSelector', function () {
      const wrapper = mount(<RangeSelector {...this.propsFromProviders} />);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        rangeSelector: {
          enabled: false
        }
      })
    });
  });
});
