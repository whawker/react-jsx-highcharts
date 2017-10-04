import React from 'react';
import ColumnSeries from '../../../src/components/ColumnSeries/ColumnSeries';
import Series from '../../../src/components/Series';

describe('<ColumnSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<ColumnSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="column" />', function () {
    const wrapper = shallow(<ColumnSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('column');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<ColumnSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
