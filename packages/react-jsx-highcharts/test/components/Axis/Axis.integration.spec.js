import React from 'react';
import Highcharts from 'highcharts';
import { HighchartsChart, withHighcharts } from '../../../src';
import Axis from '../../../src/components/Axis';
import { renderIntoDocument } from 'react-dom/test-utils';

describe('<Axis /> integration', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

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
      const renderedChart = renderIntoDocument(<WithComponent />);
    });
  });
});
