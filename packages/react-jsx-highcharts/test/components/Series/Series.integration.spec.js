import * as React from 'react';
import Highcharts from 'highcharts';
import { render } from '@testing-library/react';

import {
  HighchartsChart,
  Chart,
  YAxis,
  XAxis,
  HighchartsProvider,
  Series
} from '../../../src';

import ContextSpy from '../../ContextSpy';

describe('<Series /> integration', () => {
  let Component;
  let seriesRef;
  beforeEach(() => {
    seriesRef = {};

    Component = props => {
      return (
        <HighchartsProvider Highcharts={Highcharts}>
          <HighchartsChart>
            <Chart zoomType="x" />
            <XAxis></XAxis>
            <YAxis>
              <Series type="line" data={[1, 2, 3, 4]} {...props}>
                <ContextSpy seriesRef={seriesRef} />
              </Series>
            </YAxis>
          </HighchartsChart>
        </HighchartsProvider>
      );
    };
  });

  it('fires onHide eventhandler', () => {
    const onHide = jest.fn();

    const wrapper = render(<Component onHide={onHide} />);
    seriesRef.current.object.hide();
    expect(onHide).toHaveBeenCalled();
  });

  it('changes onHide eventhandler when new one is passed', () => {
    const onHide1 = jest.fn();
    const onHide2 = jest.fn();

    const wrapper = render(<Component onHide={onHide1} />);

    wrapper.rerender(<Component onHide={onHide2} />);

    seriesRef.current.object.hide();
    expect(onHide1).not.toHaveBeenCalled();
    expect(onHide2).toHaveBeenCalled();
  });
});
