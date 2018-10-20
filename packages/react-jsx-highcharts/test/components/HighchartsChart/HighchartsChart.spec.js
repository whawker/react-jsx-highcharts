import React from 'react';
import { Highcharts } from '../../test-utils';
import HighchartsChart from '../../../src/components/HighchartsChart/HighchartsChart';
import BaseChart from '../../../src/components/BaseChart';

describe('<HighchartsChart />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.getHighcharts = () => Highcharts
  });

  it('renders a <BaseChart />', () => {
    const wrapper = shallow(<HighchartsChart getHighcharts={testContext.getHighcharts} />);
    expect(wrapper).to.have.type(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = shallow(<HighchartsChart getHighcharts={testContext.getHighcharts} />);
    expect(wrapper).to.have.prop('chartCreationFunc').equal(Highcharts.chart);
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = shallow(<HighchartsChart getHighcharts={testContext.getHighcharts} />);
    expect(wrapper).to.have.prop('chartType').equal('chart');
  });

  it('passes other props through to <BaseChart />', () => {
    const wrapper = shallow(<HighchartsChart getHighcharts={testContext.getHighcharts} plotOptions={{ a: 'b' }} />);
    expect(wrapper).to.have.prop('plotOptions').eql({ a: 'b' });
  });
});
