import React from 'react';
import { createMockProvidedChart, createMockProvidedAxis } from '../../test-utils'
import Series from '../../../src/components/Series';
import BarSeries from '../../../src/components/BarSeries/BarSeries';

describe('<BarSeries />', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
    testContext.update = sinon.spy();

    const { chartStubs, getChart } = createMockProvidedChart();
    const { axisStubs, getAxis } = createMockProvidedAxis({ id: 'myAxis', type: 'yAxis' });

    testContext.chartStubs = chartStubs;
    testContext.axisStubs = axisStubs;

    testContext.propsFromProviders = {
      getChart,
      getAxis
    };
  });

  it('renders a <Series />', () => {
    const wrapper = shallow(<BarSeries id="mySeries" {...testContext.propsFromProviders} />);
    expect(wrapper).to.have.type(Series);
  });

  it('renders a <Series type="bar" />', () => {
    const wrapper = shallow(<BarSeries id="mySeries" {...testContext.propsFromProviders} />);
    expect(wrapper).to.have.prop('type').equal('bar');
  });

  it('passes other props through to <Series />', () => {
    const wrapper = shallow(<BarSeries id="myOtherSeries" data={[1, 2, 3, 4]} {...testContext.propsFromProviders} />);
    expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
  });

  it('inverts the chart on mount', () => {
    shallow(<BarSeries id="mySeries" {...testContext.propsFromProviders} />);
    expect(testContext.chartStubs.update).to.have.been.calledWith({
      chart: {
        inverted: true
      }
    });
  });
});
