import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, withHighcharts } from '../../../src';
import Axis from '../../../src/components/Axis';

describe('<Axis /> integration', () => {
  describe('when rendered to document', () => {
    it('fires afterInit event', done => {
      const onAfterInit = event => {
        expect(true).toBe(true);
        done();
      };
      const Component = props => {
        return (
          <HighchartsChart>
            <Axis onAfterInit={onAfterInit} />
          </HighchartsChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highcharts);
      mount(<WithComponent />);
    });
  });
});
