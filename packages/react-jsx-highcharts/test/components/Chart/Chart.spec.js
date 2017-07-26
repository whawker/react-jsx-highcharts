import React from 'react';
import { mount } from 'enzyme';
import Highcharts from 'highcharts';
import Chart from '../../../src/components/Chart/Chart';

describe('<Chart />', function ()  {
  let sandbox;

  beforeEach(function () {
    this.update = sinon.spy();
    this.getChart = sinon.stub();
    this.getChart.returns('mock-chart');

    sandbox = sinon.sandbox.create();
    sandbox.stub(Highcharts, 'addEvent');
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('when mounted', function () {
    it('updates the chart config with the provided props', function () {
      mount(<Chart type="bubble" update={this.update} getChart={this.getChart} />);
      expect(this.update).to.have.been.calledWith({
        chart : {
          type: 'bubble'
        }
      });
    });

    it('updates the chart with all props that don\'t look like event handlers', function () {
      mount(
        <Chart type="spline" propFoo="bar" zoomType="x" onClick={() => {}}
          update={this.update}
          getChart={this.getChart} />
      );
      expect(this.update).to.have.been.calledWith({
        chart : {
          type: 'spline',
          zoomType: 'x',
          propFoo: 'bar'
        }
      });
    });

    it('subscribes to Highcharts events for props that look like event handlers', function () {
      const handleClick = sinon.spy();
      const handleRender = sinon.spy();
      const handleBeforePrint = sinon.spy();

      mount(
        <Chart type="area" onClick={handleClick} onRender={handleRender} onBeforePrint={handleBeforePrint}
          update={this.update}
          getChart={this.getChart} />
      );
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-chart', 'click', handleClick);
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-chart', 'render', handleRender);
      expect(Highcharts.addEvent).to.have.been.calledWith('mock-chart', 'beforePrint', handleBeforePrint);
    });
  });
});
