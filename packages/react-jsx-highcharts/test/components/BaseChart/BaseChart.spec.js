import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import BaseChart from '../../../src/components/BaseChart';
import { createMockChart } from '../../test-utils';

describe('<BaseChart />', function ()  {
  describe('on mount', function () {
    let clock;
    let chart;

    beforeEach(function () {
      chart = createMockChart();
      this.chartCreationFunc = sinon.stub();
      this.chartCreationFunc.returns(chart);
      clock = sinon.useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    describe('when mounted', function () {
      it('should create a Highcharts chart', function () {
        const wrapper = mount(<BaseChart chartCreationFunc={this.chartCreationFunc} />);
        clock.tick(1);
        expect(this.chartCreationFunc).to.have.been.calledWith(wrapper.getDOMNode());
      });

      it('should create a chart context', function () {
        const wrapper = mount(<BaseChart chartCreationFunc={this.chartCreationFunc} />);
        clock.tick(1);
        const context = wrapper.instance().getChildContext();
        expect(context.chart).to.eql(chart);
      });
    });

    describe('when unmounted', function () {
      it('destroys the chart instance', function () {
        const wrapper = mount(<BaseChart chartCreationFunc={this.chartCreationFunc} />);
        clock.tick(1);
        expect(chart.destroy).not.to.have.been.called;
        wrapper.unmount();
        clock.tick(1);
        expect(chart.destroy).to.have.been.called;
      });
    });
  });
});
