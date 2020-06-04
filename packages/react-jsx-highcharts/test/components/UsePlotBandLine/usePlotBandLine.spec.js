import * as React from 'react';
import usePlotBandLine from '../../../src/components/UsePlotBandLine';
import PlotBandLineContext from '../../../src/components/PlotBandLineContext';

describe('usePlotBandLine', () => {
  let ProvidedPlotBandLineComponent;
  let ChildComponent;
  let testPlotBandLine;

  beforeEach(() => {
    testPlotBandLine = {};

    ChildComponent = props => {
      const PlotBandLine = usePlotBandLine();
      return <div value={PlotBandLine} />;
    };
    ProvidedPlotBandLineComponent = props => (
      <PlotBandLineContext.Provider value={testPlotBandLine}>
        <ChildComponent {...props} />
      </PlotBandLineContext.Provider>
    );
  });
  it('should return PlotBandLine from context', () => {
    const wrapper = mount(<ProvidedPlotBandLineComponent />);

    expect(wrapper.find('div')).toHaveProp('value', testPlotBandLine);
  });
});
