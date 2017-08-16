import React, { Component } from 'react';
import {
  Highcharts3dChart, Chart, XAxis, YAxis, ZAxis, Title, Subtitle, ScatterSeries
} from 'react-jsx-highcharts';
import zones from './zones';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
const radian = Math.PI / 180;

class App extends Component {

  constructor (props) {
    super(props);

    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.state = {
      numRows: 25,
      beta: 22
    };
  }

  componentWillMount () {
    const { numRows } = this.state;

    const data = [];
    const d = 360 / numRows;
    const step = d * radian;

    for (let i = 0; i < numRows; i++) {
      const iCos = Math.cos(i * step);
      for (let j = 0; j < numRows; j++) {
        const value = iCos * Math.cos(j * step);
        data.push([ i, value, j ]);
      }
    }

    this.setState({
      data
    });
  }

  handleSliderChange (e) {
    this.setState({
      beta: e.target.value
    });
  }

  render() {
    const { numRows, data, beta } = this.state;
    if (!data) return null;

    const plotOptions = {
      scatter: {
        marker: {
          states: {
            hover: { enabled: false },
            select: { enabled: false }
          }
        }
      }
    };

    return (
      <div className="app">
        <Highcharts3dChart alpha={30} beta={beta} depth={300} viewDistance={0} plotOptions={plotOptions}>
          <Chart />

          <Title>3D Scatter Chart</Title>

          <Subtitle>Plotting cos(x) * cos(y) (with zones for colours)</Subtitle>

          <XAxis min={0} max={numRows} labels={{ enabled: false }} />

          <YAxis id="yAxis" min={-2} max={2} labels={{ enabled: false }} />

          <ZAxis min={0} max={numRows} labels={{ enabled: false }}>
            <ScatterSeries id="contour" data={data} zones={zones} />
          </ZAxis>
        </Highcharts3dChart>

        <div>
          <label htmlFor="beta">Beta Angle</label>
          <input id="beta" type="range" min="0" max="45" step="1" value={beta} onChange={this.handleSliderChange} />
          <span>{beta}</span>
        </div>
        
        <ExampleCode name="3DChart">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
