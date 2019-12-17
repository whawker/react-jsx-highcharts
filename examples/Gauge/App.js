import React, { Component } from 'react';
import Highcharts from 'highcharts';
import {
  HighchartsChart, withHighcharts, XAxis, YAxis, Pane, SolidGaugeSeries
} from 'react-jsx-highcharts';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

const plotOptions = {
  solidgauge: {
    dataLabels: {
      y: 5,
      borderWidth: 0,
      useHTML: true
    }
  }
};

const dataLabels = {
  format: '<div style="text-align:center"><span style="font-size:25px;color:black">{y}</span><br/><span style="font-size:12px;color:silver">km/h</span></div>',
  y: -50
};
const tooltip = {
  valueSuffix: ' km/h'
}

class App extends Component {

  state = {
    kmph: 80
  }

  componentDidMount () {
    this.interval = window.setInterval(this.updateSpeed, 1000)
  }

  componentWillUnmount () {
    window.clearInterval(this.interval)
  }

  updateSpeed = () => {
    this.setState(({ kmph }) => {
      const offset = this.getRandomSpeedOffset()
      const newKmph = Math.max(0, Math.min(200, kmph + offset));
      return {
        kmph: newKmph
      }
    })
  }

  getRandomSpeedOffset = () => {
    return Math.floor(Math.random() * 40) - 20;
  }

  render() {
    return (
      <div className="app">
        <HighchartsChart gauge plotOptions={plotOptions}>
          <Pane
            center={['50%', '85%']}
            size='100%'
            startAngle={-90}
            endAngle={90}
            background={{
              backgroundColor: '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
            }} />
          <XAxis />
          <YAxis
            stops={[
              [0.1, '#55BF3B'],
              [0.5,  '#DDDF0D'],
              [0.9, '#DF5353']
            ]}
            lineWidth={0}
            minorTickInterval={null}
            tickPixelInterval={400}
            tickWidth={0}
            labels={{
              y: 16,
              style: { display: 'none' }
            }}
            min={0}
            max={200}>
            <YAxis.Title y={-110}>Speed</YAxis.Title>
            <SolidGaugeSeries
              name='Speed'
              data={[ this.state.kmph ]}
              dataLabels={dataLabels}
              tooltip={tooltip}
            />
          </YAxis>

        </HighchartsChart>

        <ExampleCode name="Gauge">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
