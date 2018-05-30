import React from 'react';
import { BaseChart } from 'react-jsx-highcharts';
import { Highcharts } from '../../test-utils';
import HighchartsStockChart from '../../../src/components/HighchartsStockChart/HighchartsStockChart';

describe('<HighchartsStockChart />', function ()  {
  beforeEach(function () {
    this.getHighcharts = () => Highcharts
  });

  it('renders a <BaseChart />', function ()  {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', function () {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.prop('chartCreationFunc').equal(Highcharts.stockChart);
  });

  it('renders a <BaseChart /> with the correct chart type', function () {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.prop('chartType').equal('stockChart');
  });

  it('passes other props through to <BaseChart />', function () {
    const wrapper = shallow(<HighchartsStockChart getHighcharts={this.getHighcharts} plotOptions={{ c: 'd' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ c: 'd' });
  });
});
