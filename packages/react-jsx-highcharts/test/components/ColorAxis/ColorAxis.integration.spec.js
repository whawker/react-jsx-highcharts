import React from 'react';
import Highcharts from 'highcharts';
import addColorAxis from 'highcharts/modules/coloraxis';
import { HighchartsChart, withHighcharts } from '../../../src';
import Chart from '../../../src/components/Chart';
import ColorAxis from '../../../src/components/ColorAxis';
import Series from '../../../src/components/Series';
import YAxis from '../../../src/components/YAxis';
import XAxis from '../../../src/components/XAxis';
import { render } from 'react-dom';

addColorAxis(Highcharts);

describe('<ColorAxis /> integration', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  describe('when mounted', () => {
    it('renders series with coloraxis', done => {
      const onAfterAddSeries = event => {
        const colorAxis = event.target.colorAxis[0];

        expect(colorAxis.options.id).toEqual('testcoloraxis');
        expect(colorAxis.options.min).toEqual(0);
        expect(colorAxis.options.max).toEqual(10);

        const series = event.target.series[0];
        expect(series.colorAxis.options.id).toEqual('testcoloraxis');
        done();
      };
      const data = [{ y: 1, colorValue: 0 }, { y: 10, colorValue: 10 }];
      const Component = props => {
        return (
          <HighchartsChart>
            <Chart onAfterAddSeries={onAfterAddSeries} />
            <XAxis />
            <ColorAxis id="testcoloraxis" min={0} max={10}>
              <YAxis>
                <Series colorKey="colorValue" type="column" data={data} />
              </YAxis>
            </ColorAxis>
          </HighchartsChart>
        );
      };
      const WithComponent = withHighcharts(Component, Highcharts);
      render(<WithComponent />, container);
    });
  });
});