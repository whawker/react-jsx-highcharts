import React from 'react';
import { XAxis } from 'react-jsx-highcharts';
import MapXAxis from '../../../src/components/XAxis';

describe('<XAxis />', function ()  {
  it('renders an <XAxis />', function ()  {
    const wrapper = shallow(<MapXAxis />);
    expect(wrapper).to.have.type(XAxis);
  });

  it('should always have the id `xAxis`', function ()  {
    const wrapper = shallow(<MapXAxis id="customId" />);
    expect(wrapper).to.have.prop('id').equal('xAxis');
  });

  it('should NOT be a dynamic axis', function ()  {
    const wrapper = shallow(<MapXAxis />);
    expect(wrapper).to.have.prop('dynamicAxis').equal(false);
  });

  it('passes other props through to <XAxis />', function () {
    const wrapper = shallow(<MapXAxis tickLength={1337} />);
    expect(wrapper).to.have.prop('tickLength').equal(1337);
  });
});
