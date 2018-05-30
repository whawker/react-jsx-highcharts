import React, {Component} from 'react';
import highcharts from 'highcharts';
import { HighchartsChart, Chart, XAxis, YAxis, LineSeries, withHighcharts } from 'react-jsx-highcharts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSecondarySeries: false
    };
  }

  toggleSeries = () => {
    this.setState({
      showSecondarySeries: !this.state.showSecondarySeries
    });
  }

  render() {
    return (
      <div className="app" style={{ margin: 20 }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={this.toggleSeries}>Toggle data</button>
        </div>

        <HighchartsChart>
          <Chart/>

          <XAxis/>

          <YAxis>
            <YAxis.Title>Primary</YAxis.Title>
            <LineSeries data={[ 1, 2, 3, 4, 5 ]}/>
          </YAxis>

          {this.state.showSecondarySeries
            ?
            <YAxis opposite>
              <YAxis.Title opposite>Secondary</YAxis.Title>
              <LineSeries data={[ 5, 4, 3, 2, 1 ]}/>
            </YAxis>
            : undefined}
        </HighchartsChart>
      </div>
    );
  }
}

export default withHighcharts(App, highcharts);
