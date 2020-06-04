import * as React from 'react';
import useHighcharts from '../../../src/components/UseHighcharts';
import HighchartsContext from '../../../src/components/HighchartsContext';
import { Highcharts } from '../../test-utils';

describe('useHighcharts', () => {
  let ProvidedHighchartsComponent;
  let ChildComponent;

  beforeEach(() => {
    ChildComponent = props => {
      const Highcharts = useHighcharts();
      return <div value={Highcharts} />;
    };
    ProvidedHighchartsComponent = props => (
      <HighchartsContext.Provider value={Highcharts}>
        <ChildComponent {...props} />
      </HighchartsContext.Provider>
    );
  });
  it('should return Highcharts from context', () => {
    const wrapper = mount(<ProvidedHighchartsComponent />);

    expect(wrapper.find('div')).toHaveProp('value', Highcharts);
  });
});
