import React from 'react';
import { BaseChart } from 'react-jsx-highcharts';
import { Highcharts } from '../../test-utils';
import HighchartsGanttChart from '../../../src/components/HighchartsGanttChart/HighchartsGanttChart';

describe('<HighchartsGanttChart />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.getHighcharts = () => Highcharts
  });

  it('renders a <BaseChart />', () => {
    const wrapper = shallow(<HighchartsGanttChart getHighcharts={testContext.getHighcharts} />);
    expect(wrapper.type()).toEqual(BaseChart);
  });

});
