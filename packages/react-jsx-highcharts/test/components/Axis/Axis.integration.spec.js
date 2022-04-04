import * as React from 'react';
import Highcharts from 'highcharts';
import { render } from '@testing-library/react';

import { HighchartsChart, HighchartsProvider } from '../../../src';
import Axis from '../../../src/components/Axis';
import ContextSpy from '../../ContextSpy';

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
  describe('when updated', () => {
    it('updates eventhandlers', () => {
      const axisRef = {};

      const Component = ({ axisProps }) => {
        return (
          <HighchartsProvider Highcharts={Highcharts}>
            <HighchartsChart>
              <Axis {...axisProps}>
                <ContextSpy axisRef={axisRef} />
              </Axis>
            </HighchartsChart>
          </HighchartsProvider>
        );
      };

      const { rerender } = render(<Component />);

      const onSetExtremes = jest.fn();

      rerender(<Component axisProps={{ onSetExtremes }} />);

      const onSetExtremes2 = jest.fn();
      axisRef.current.setExtremes(10, 20);
      expect(onSetExtremes).toHaveBeenCalledTimes(1);
      onSetExtremes.mockClear();

      rerender(<Component axisProps={{ onSetExtremes: onSetExtremes2 }} />);

      axisRef.current.setExtremes(100, 200);
      expect(onSetExtremes).not.toHaveBeenCalled();

      expect(onSetExtremes2).toHaveBeenCalledTimes(1);
    });
  });
});
