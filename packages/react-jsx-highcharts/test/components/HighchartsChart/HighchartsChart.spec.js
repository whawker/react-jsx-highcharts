import React from 'react';
import { Highcharts } from '../../test-utils';
import HighchartsChart from '../../../src/components/HighchartsChart/HighchartsChart';
import BaseChart from '../../../src/components/BaseChart';

describe('<HighchartsChart />', function ()  {
  beforeEach(function () {
    this.getHighcharts = () => Highcharts
  });

  it('renders a <BaseChart />', function ()  {
    const wrapper = shallow(<HighchartsChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', function () {
    const wrapper = shallow(<HighchartsChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.prop('chartCreationFunc').equal(Highcharts.chart);
  });

  it('renders a <BaseChart /> with the correct chart type', function () {
    const wrapper = shallow(<HighchartsChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.prop('chartType').equal('chart');
  });

  it('passes other props through to <BaseChart />', function () {
    const wrapper = shallow(<HighchartsChart getHighcharts={this.getHighcharts} plotOptions={{ a: 'b' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ a: 'b' });
  });
});
