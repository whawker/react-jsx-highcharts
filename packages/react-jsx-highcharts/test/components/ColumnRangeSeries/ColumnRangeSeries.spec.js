import React from 'react';
import ColumnRangeSeries from '../../../src/components/ColumnRangeSeries/ColumnRangeSeries';
import Series from '../../../src/components/Series';

describe('<ColumnRangeSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<ColumnRangeSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="columnrange" />', function () {
    const wrapper = shallow(<ColumnRangeSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('columnrange');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<ColumnRangeSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
