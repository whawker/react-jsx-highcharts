import React, { Component } from 'react';
import provideHighcharts from '../../../src/components/HighchartsProvider';
import { Highcharts } from '../../test-utils';

const WrappedComponent = props => (
  <div />
);
const HighchartsWrappedComponent = provideHighcharts(WrappedComponent);

describe('<HighchartsProvider />', function () {

  beforeEach(function () {
    this.context = {
      Highcharts
    };
  });

  describe('provided prop functions', function () {
    it('should pass a prop getHighcharts that retrieves the Highcharts obj', function () {
      const wrapper = shallow(<HighchartsWrappedComponent />, {context: this.context}).find(WrappedComponent);
      expect(wrapper.props().getHighcharts()).to.eql(Highcharts);
    });
  });
});
