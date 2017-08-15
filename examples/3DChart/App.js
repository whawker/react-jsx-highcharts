import React, { Component } from 'react';
import {
  Highcharts3dChart, Chart, XAxis, YAxis, ZAxis, Title, ScatterSeries
} from 'react-jsx-highcharts';
import zones from './zones';
// import ExampleCode from '../utils/ExampleCode';
// import code from './exampleCode';
const radian = Math.PI / 180;

class App extends Component {

  constructor (props) {
    super(props);

    this.state = {
      numRows: 25
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

  render() {
    const { numRows, data } = this.state;
    if (!data) return null;

    const plotOptions = {
      scatter: {
        width: 10,
        height: 10,
        depth: 10
      }
    };

    return (
      <div className="app">

        <Highcharts3dChart alpha={30} beta={45} depth={300} viewDistance={0} plotOptions={plotOptions}>
          <Chart width={600} />

          <Title>Scatter</Title>

          <XAxis min={0} max={numRows} labels={{ enabled: false }} />

          <YAxis id="yAxis" min={-2} max={2} labels={{ enabled: false }} />

          <ZAxis min={0} max={numRows} labels={{ enabled: false }}>
            <ScatterSeries id="contour" data={data} zones={zones} />
          </ZAxis>
        </Highcharts3dChart>
      </div>
    );
  }
}

export default App;
