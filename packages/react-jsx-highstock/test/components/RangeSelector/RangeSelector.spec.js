import React from 'react';
import RangeSelector from '../../../src/components/RangeSelector/RangeSelector';
import RangeSelectorInner from '../../../src/components/RangeSelector/RangeSelectorInner';

describe('<RangeSelector />', function ()  {
  it('renders a <RangeSelectorInner />', function ()  {
    const wrapper = shallow(<RangeSelector />);
    expect(wrapper).to.have.type(RangeSelectorInner);
  });

  it('renders a <RangeSelectorInner axisId="xAxis" />', function () {
    const wrapper = shallow(<RangeSelector />);
    expect(wrapper).to.have.prop('axisId').equal('xAxis');
  });

  it('passes other props through to <RangeSelectorInner />', function () {
    const wrapper = shallow(<RangeSelector height={100} buttonSpacing={2} />);
    expect(wrapper).to.have.prop('height').eql(100);
    expect(wrapper).to.have.prop('buttonSpacing').eql(2);
  });
});
