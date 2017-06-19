import React from 'react';
import { mount } from 'enzyme';
import Highcharts from 'highstock-release';
import RangeSelector from '../../../src/components/RangeSelector/RangeSelector';
import { createMockChart } from '../../test-utils';

describe('<RangeSelector />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.update = sinon.spy();
    this.chart = createMockChart();

    this.context = {
      chart: this.chart
    };

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'RangeSelector');
    sandbox.stub(Highcharts, 'addEvent');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('creates a new Highcharts RangeSelector instance', function () {
      mount(<RangeSelector update={this.update} />, {context: this.context});
      expect(Highcharts.RangeSelector).to.have.been.calledWithNew;
      expect(Highcharts.RangeSelector).to.have.been.calledWith(this.chart);
    });

    it('updates the chart with the passed props', function () {
      mount(<RangeSelector height={100} buttonSpacing={2} update={this.update} />, {context: this.context});
      expect(this.update).to.have.been.calledWith({
        rangeSelector: {
          ...RangeSelector.defaultProps,
          enabled: true,
          inputEnabled: false,
          height: 100,
          buttonSpacing: 2,
          update: this.update
        }
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<RangeSelector selected={0} update={this.update} />, {context: this.context});
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
      const wrapper = mount(<RangeSelector update={this.update} />, {context: this.context});
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        rangeSelector: {
          enabled: false
        }
      })
    });
  });
});
