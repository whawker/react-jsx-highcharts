import React from 'react';
import VariablePieSeries from '../../../src/components/VariablePieSeries/VariablePieSeries';
import Series from '../../../src/components/Series';

describe('<VariablePieSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<VariablePieSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="variablepie" />', function () {
    const wrapper = shallow(<VariablePieSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('variablepie');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<VariablePieSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
