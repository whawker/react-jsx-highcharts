import React, { Component } from 'react';
import LeagueTableChart from './LeagueTableChart';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import './index.css';

class App extends Component {
  state = {
    matchWeek: 38
  };

  handleSlide = e => {
    this.setState({
      matchWeek: e.target.value
    })
  }

  render () {
    const { matchWeek } = this.state;

    return (
      <div className="app">
        <LeagueTableChart matchWeek={matchWeek} />
        <div className="input">
          <label htmlFor="matchWeek">Match Week</label>
          <input id="matchWeek" type="range" value={matchWeek} onChange={this.handleSlide} min={0} max={38} step={1} />
          <span>{matchWeek}</span>
        </div>

        <ExampleCode name="Responsive">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
