import React from 'react';
import { shallow } from 'enzyme';
import XAxis from '../../../src/components/XAxis/XAxis';
import Axis from '../../../src/components/Axis';

describe('<XAxis />', function ()  {
  beforeEach(function () {
    this.isHighchartsChart = () => 'chart';
    this.isHighstockChart = () => 'stockChart';
  });

  it('renders an <Axis />', function ()  {
    const wrapper = shallow(<XAxis getChartType={this.isHighchartsChart} />);
    expect(wrapper).to.have.type(Axis);
  });

  it('renders an <Axis dimension="x" />', function () {
    const wrapper = shallow(<XAxis getChartType={this.isHighchartsChart} />);
    expect(wrapper).to.have.prop('dimension').equal('x');
  });

  it('renders the <Axis /> type if provided (Highcharts chart)', function () {
    const wrapper = shallow(<XAxis getChartType={this.isHighchartsChart} type="logarithmic" />);
    expect(wrapper).to.have.prop('type').equal('logarithmic');
  });

  it('renders the <Axis /> type if provided (Highstock chart)', function () {
    const wrapper = shallow(<XAxis getChartType={this.isHighstockChart} type="logarithmic" />);
    expect(wrapper).to.have.prop('type').equal('logarithmic');
  });

  it('renders the an <Axis type="linear" /> if no type specified (Highcharts chart)', function () {
    const wrapper = shallow(<XAxis getChartType={this.isHighchartsChart} />);
    expect(wrapper).to.have.prop('type').equal('linear');
  });

  it('renders the an <Axis type="datetime" /> if no type specified (Highstock chart)', function () {
    const wrapper = shallow(<XAxis getChartType={this.isHighstockChart} />);
    expect(wrapper).to.have.prop('type').equal('datetime');
  });

  it('passes other props through to <Axis />', function () {
    const wrapper = shallow(<XAxis getChartType={this.isHighchartsChart} tickLength={1337} />);
    expect(wrapper).to.have.prop('tickLength').equal(1337);
  });
});
