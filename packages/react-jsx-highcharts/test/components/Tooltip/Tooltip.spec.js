import React from 'react';
import { mount } from 'enzyme';
import Highcharts from 'highcharts';
import Tooltip from '../../../src/components/Tooltip/Tooltip';
import { createMockChart } from '../../test-utils';

describe('<Tooltip />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.update = sinon.spy();
    this.chart = createMockChart();
    this.getChart = sinon.stub();
    this.getChart.returns(this.chart);

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'Tooltip');
    sandbox.stub(Highcharts, 'addEvent');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('creates a new Highcharts Tooltip instance', function () {
      mount(<Tooltip update={this.update} getChart={this.getChart} />);
      expect(Highcharts.Tooltip).to.have.been.calledWithNew;
    });

    it('updates the chart with the passed props', function () {
      mount(<Tooltip backgroundColor="red" shadow={false} update={this.update} getChart={this.getChart} />);
      expect(Highcharts.Tooltip).to.have.been.calledWith(this.chart, {
        ...Tooltip.defaultProps,
        backgroundColor: 'red',
        enabled: true,
        shadow: false,
        update: this.update
      });
    });
  });

  describe('update', function () {
    it('should use the update method when props change', function () {
      const wrapper = mount(<Tooltip selected={0} update={this.update} getChart={this.getChart} />);
      wrapper.setProps({ padding: 2 });
      expect(this.update).to.have.been.calledWith({
        tooltip: {
          padding: 2
        }
      });
    });
  });

  describe('when unmounted', function () {
    it('should disable the Tooltip', function () {
      const wrapper = mount(<Tooltip update={this.update} getChart={this.getChart} />);
      wrapper.unmount();
      expect(this.update).to.have.been.calledWith({
        tooltip: {
          enabled: false
        }
      })
    });
  });
});
