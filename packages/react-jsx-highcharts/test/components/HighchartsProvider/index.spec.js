import React, { Component } from 'react';
import { Highcharts } from '../../test-utils';
import { Provider } from '../../../src/components/HighchartsContext';
import provideHighcharts from '../../../src/components/HighchartsProvider';

const WrappedComponent = props => (
  <div />
);
let HighchartsWrappedComponent;

describe('<HighchartsProvider />', () => {
  beforeEach(() => {
    HighchartsWrappedComponent = provideHighcharts(WrappedComponent);
  });

  it('should render the wrapped component', () => {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).toExist();
  });

  it('should provide a getHighcharts prop to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getHighcharts')).toEqual(expect.any(Function));
  });

  it('should pass through other props to the wrapped component', () => {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getHighcharts')).toEqual(expect.any(Function));
    expect(wrapper.find(WrappedComponent).prop('someProp')).toEqual('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).toEqual('otherValue');
  });

  it('should provide the Highcharts global when calling getHighcharts', () => {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent />
      </Provider>
    );

    const obj = wrapper.find(WrappedComponent).props().getHighcharts();
    expect(obj).toEqual(Highcharts);
  });
});
