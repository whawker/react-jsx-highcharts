import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  Tooltip,
  Legend,
  ColumnSeries
} from 'react-jsx-highcharts';

class MyChart extends Component {
  makeFormatterFunction = toolTipEnabledFor => {
    return function() {
      return this.point.x === toolTipEnabledFor ? 'Yeah' : false;
    };
  };

  handleClick = () => {
    alert('OnClick works!');
  };

  render() {
    const { data, toolTipEnabledFor } = this.props;

    const formatterFn = this.makeFormatterFunction(toolTipEnabledFor);

    return (
      <HighchartsChart>
        <Chart />

        <Title>OnClick Error Example</Title>

        <Legend />
        <Tooltip
          useHTML
          padding={12}
          borderRadius={4}
          borderColor="transparent"
          formatter={formatterFn}
        />

        <XAxis

          categories={['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']}
        />

        <YAxis>
          <ColumnSeries data={data} onClick={this.handleClick} />
        </YAxis>
      </HighchartsChart>
    );
  }
}

export default withHighcharts(MyChart, Highcharts);
