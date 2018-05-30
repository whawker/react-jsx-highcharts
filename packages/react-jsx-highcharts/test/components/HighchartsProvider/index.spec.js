import React, { Component } from 'react';
import { Highcharts } from '../../test-utils';
import { Provider } from '../../../src/components/HighchartsContext';
import provideHighcharts from '../../../src/components/HighchartsProvider';

const WrappedComponent = props => (
  <div />
);
let HighchartsWrappedComponent;

describe('<HighchartsProvider />', function () {
  beforeEach(function () {
    HighchartsWrappedComponent = provideHighcharts(WrappedComponent);
  });

  it('should render the wrapped component', function () {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent)).to.exist;
  });

  it('should provide a getHighcharts prop to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getHighcharts')).to.be.a('function');
  });

  it('should pass through other props to the wrapped component', function () {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent someProp='someValue' otherProp='otherValue' />
      </Provider>
    );

    expect(wrapper.find(WrappedComponent).prop('getHighcharts')).to.be.a('function');
    expect(wrapper.find(WrappedComponent).prop('someProp')).to.equal('someValue');
    expect(wrapper.find(WrappedComponent).prop('otherProp')).to.equal('otherValue');
  });

  it('should provide the Highcharts global when calling getHighcharts', function () {
    const wrapper = mount(
      <Provider value={Highcharts}>
        <HighchartsWrappedComponent />
      </Provider>
    );

    const obj = wrapper.find(WrappedComponent).props().getHighcharts();
    expect(obj).to.equal(Highcharts);
  });
});
