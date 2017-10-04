import React from 'react';
import BarSeries from '../../../src/components/BarSeries/BarSeries';
import Series from '../../../src/components/Series';

describe('<BarSeries />', function ()  {
  beforeEach(function () {
    this.update = sinon.spy();
  });

  it('renders a <Series />', function ()  {
    const wrapper = shallow(<BarSeries id="mySeries" update={this.update} />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="bar" />', function () {
    const wrapper = shallow(<BarSeries id="mySeries" update={this.update} />);
    expect(wrapper).to.have.prop('type').equal('bar');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<BarSeries id="myOtherSeries" data={[1, 2, 3, 4]} update={this.update} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });

  it('inverts the chart on mount', function () {
    shallow(<BarSeries id="mySeries" update={this.update} />);
    expect(this.update).to.have.been.calledWith({
      chart: {
        inverted: true
      }
    });
  });
});
