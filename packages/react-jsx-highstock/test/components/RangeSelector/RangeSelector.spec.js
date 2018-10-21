import React from 'react';
import RangeSelector from '../../../src/components/RangeSelector/RangeSelector';
import RangeSelectorInner from '../../../src/components/RangeSelector/RangeSelectorInner';

describe('<RangeSelector />', () => {
  it('renders a <RangeSelectorInner />', () => {
    const wrapper = shallow(<RangeSelector />);
    expect(wrapper.type()).toEqual(RangeSelectorInner);
  });

  it('renders a <RangeSelectorInner axisId="xAxis" />', () => {
    const wrapper = shallow(<RangeSelector />);
    expect(wrapper).toHaveProp('axisId', 'xAxis');
  });

  it('passes other props through to <RangeSelectorInner />', () => {
    const wrapper = shallow(<RangeSelector height={100} buttonSpacing={2} />);
    expect(wrapper).toHaveProp('height',100);
    expect(wrapper).toHaveProp('buttonSpacing',2);
  });
});
