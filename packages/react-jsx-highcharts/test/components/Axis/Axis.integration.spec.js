import * as React from 'react';
import Highcharts from 'highcharts';
import { render } from '@testing-library/react';

import { HighchartsChart, HighchartsProvider } from '../../../src';
import Axis from '../../../src/components/Axis';

describe('<Axis /> integration', () => {
  describe('when rendered to document', () => {
    it('fires afterInit event', done => {
      const onAfterInit = () => {
        expect(true).toBe(true);
        done();
      };
      const Component = () => {
        return (
          <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart>
              <Axis onAfterInit={onAfterInit} />
            </HighchartsChart>
          </HighchartsProvider>
        );
      };

      render(<Component />);
    });
  });
});
