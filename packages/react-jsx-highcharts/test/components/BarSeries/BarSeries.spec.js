import React from 'react';
import { createMockProvidedChart, createMockProvidedAxis } from '../../test-utils'
import Series from '../../../src/components/Series';
import BarSeries from '../../../src/components/BarSeries/BarSeries';

describe('<BarSeries />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  beforeEach(function () {
    const { chartStubs, getChart } = createMockProvidedChart();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });

    this.chartStubs = chartStubs;
    this.axisStubs = axisStubs;

    this.propsFromProviders = {
      getChart,
      getAxis
    };
  });

  it('renders a <Series />', function ()  {
    const wrapper = shallow(<BarSeries id="mySeries" {...this.propsFromProviders} />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="bar" />', function () {
    const wrapper = shallow(<BarSeries id="mySeries" {...this.propsFromProviders} />);
    expect(wrapper).to.have.prop('type').equal('bar');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<BarSeries id="myOtherSeries" data={[1, 2, 3, 4]} {...this.propsFromProviders} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });

  it('inverts the chart on mount', function () {
    shallow(<BarSeries id="mySeries" {...this.propsFromProviders} />);
    expect(this.chartStubs.update).to.have.been.calledWith({
      chart: {
        inverted: true
      }
    });
  });
});
