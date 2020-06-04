import * as React from 'react';
import {
  createMockProvidedChart,
  createMockProvidedAxis
} from '../../test-utils';
import Series from '../../../src/components/Series';
import BarSeries from '../../../src/components/BarSeries/BarSeries';
import ChartContext from '../../../src/components/ChartContext';

describe('<BarSeries />', () => {
  let testContext;
  let ProvidedBarSeries;
  beforeEach(() => {
    testContext = {};

    const { chartStubs } = createMockProvidedChart();

    testContext.chartStubs = chartStubs;

    ProvidedBarSeries = props => (
      <ChartContext.Provider value={chartStubs}>
        <BarSeries {...props} />
      </ChartContext.Provider>
    );
  });

  it('renders a <Series />', () => {
    const wrapper = mount(<ProvidedBarSeries id="mySeries" />);
    expect(wrapper.find(Series)).toExist();
  });

  it('renders a <Series type="bar" />', () => {
    const wrapper = mount(<ProvidedBarSeries id="mySeries" />);
    expect(wrapper.find(Series)).toHaveProp('type', 'bar');
  });

  it('passes other props through to <Series />', () => {
    const wrapper = mount(
      <ProvidedBarSeries id="myOtherSeries" data={[1, 2, 3, 4]} />
    );
    expect(wrapper.find(Series)).toHaveProp('data', [1, 2, 3, 4]);
  });

  it('inverts the chart on mount', () => {
    mount(<ProvidedBarSeries id="mySeries" />);
    expect(testContext.chartStubs.update).toHaveBeenCalledWith({
      chart: {
        inverted: true
      }
    });
  });
});
