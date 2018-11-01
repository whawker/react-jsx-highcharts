import React from 'react';
import {BaseChart} from 'react-jsx-highcharts';
import {Highcharts} from '../../test-utils';
import HighchartsGanttChart from '../../../src/components/HighchartsGanttChart/HighchartsGanttChart';

describe('<HighchartsGanttChart />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.getHighcharts = () => Highcharts
  });

  it('renders a <BaseChart />', () => {
    const wrapper = shallow(<HighchartsGanttChart getHighcharts={testContext.getHighcharts}/>);
    expect(wrapper.type()).toEqual(BaseChart);
  });

  it('renders a <BaseChart /> with the correct creation function', () => {
    const wrapper = shallow(<HighchartsGanttChart getHighcharts={testContext.getHighcharts}/>);
    expect(wrapper).toHaveProp('chartCreationFunc', Highcharts.ganttChart);
  });

  it('renders a <BaseChart /> with the correct chart type', () => {
    const wrapper = shallow(<HighchartsGanttChart getHighcharts={testContext.getHighcharts}/>);
    expect(wrapper).toHaveProp('chartType', 'ganttChart');
  });

  it('passes other props through to <BaseChart />', () => {
    const wrapper = shallow(<HighchartsGanttChart getHighcharts={testContext.getHighcharts} plotOptions={{c: 'd'}}/>);
    expect(wrapper).toHaveProp('plotOptions', {c: 'd'});
  });

});
