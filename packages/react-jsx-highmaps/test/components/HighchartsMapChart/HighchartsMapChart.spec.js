import React from 'react';
import { BaseChart } from 'react-jsx-highcharts';
import { Highcharts } from '../../test-utils';
import HighchartsMapChart from '../../../src/components/HighchartsMapChart/HighchartsMapChart';

describe('<HighchartsMapChart />', function ()  {
  beforeEach(function () {
    this.getHighcharts = () => Highcharts
  });

  it('renders a <BaseChart />', function ()  {
    const wrapper = shallow(<HighchartsMapChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', function () {
    const wrapper = shallow(<HighchartsMapChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.prop('chartCreationFunc').equal(Highcharts.mapChart);
  });

  it('renders a <BaseChart /> with the correct chart type', function () {
    const wrapper = shallow(<HighchartsMapChart getHighcharts={this.getHighcharts} />);
    expect(wrapper).to.have.prop('chartType').equal('mapChart');
  });

  it('renders a <BaseChart /> with GeoJSON from a string', function () {
    const wrapper = shallow(<HighchartsMapChart getHighcharts={this.getHighcharts} map='mock/map' />);
    expect(wrapper).to.have.prop('chart').eql({ map: { some: 'data' } });
  })

  it('renders a <BaseChart /> with direct GeoJSON', function () {
    const wrapper = shallow(<HighchartsMapChart getHighcharts={this.getHighcharts} map={{ direct: 'input' }} />);
    expect(wrapper).to.have.prop('chart').eql({ map: { direct: 'input' } });
  })

  it('passes other props through to <BaseChart />', function () {
    const wrapper = shallow(<HighchartsMapChart getHighcharts={this.getHighcharts} plotOptions={{ c: 'd' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ c: 'd' });
  });
});
