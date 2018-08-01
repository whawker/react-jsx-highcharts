import React from 'react';
import Scatter3dSeries from '../../../src/components/Scatter3dSeries/Scatter3dSeries';
import Series from '../../../src/components/Series';

describe('<Scatter3dSeries />', function ()  {
  it('renders a <Series />', function ()  {
    const wrapper = shallow(<Scatter3dSeries id="mySeries" />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="scatter3d" />', function () {
    const wrapper = shallow(<Scatter3dSeries id="mySeries" />);
    expect(wrapper).to.have.prop('type').equal('scatter3d');
  });

  it('passes other props through to <Series />', function () {
    const wrapper = shallow(<Scatter3dSeries id="myOtherSeries" data={[1, 2, 3, 4]} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });
});
