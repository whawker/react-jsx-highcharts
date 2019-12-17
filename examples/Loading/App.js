import React, { Component } from 'react';
import {
  HighchartsChart, withHighcharts, Title, Subtitle, XAxis, YAxis, LineSeries, Legend, Tooltip, Loading
} from 'react-jsx-highcharts';
import Highcharts from 'highcharts';
import mapValues from 'lodash/mapValues';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';

Highcharts.setOptions({
  lang: { thousandsSep: ',' }
});

const YEAR_MS = 60 * 60 * 24 * 365 * 1000;

const isWeekDay = ({ day }) => {
  const dayOfWeek = new Date(day).getDay();
  return dayOfWeek > 0 && dayOfWeek < 6;
}

const toDataSeries = ({ day, downloads }) => (
  [ new Date(day).getTime(), downloads ]
);

const delay = (start, ms) => {
  return res => {
    // Exaggerate network loading time
    return new Promise(resolve => {
      const now = Date.now();
      const delay = (now - start < ms) ? ((start + ms) - now) : 0;
      window.setTimeout(() => {
        resolve(res)
      }, delay);
    });
  }
};

const npmApiDownloadsRange = (period, packages) => {
  const now = Date.now();
  return fetch(`https://api.npmjs.org/downloads/range/${period}/${packages.join(',')}`)
    .then(delay(now, 3000)) // Delay at 3 seconds
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(res => {
      return mapValues(res, pkg => {
        return pkg.downloads.filter(isWeekDay).map(toDataSeries);
      });
    });
};

const frameworks = {
  react: { name: 'React', color: '#61dafb' },
  angular: { name: 'Angular', color: '#dd1b16' },
  vue: { name: 'Vue.js', color: '#42b983' },
  'ember-source': { name: 'Ember.js', color: '#dd6a58' },
  preact: { name: 'Preact', color: '#673ab8' }
};

const plotOptions = {
  line: {
    marker: {
      enabled: false
    }
  }
};

class App extends Component {

  constructor (props) {
    super(props);

    this.renderSeries = this.renderSeries.bind(this);

    this.state = {
      now: new Date().setHours(0, 0, 0, 0),
      frameworks,
      npmPackages: Object.keys(frameworks),
      downloads: Object.keys(frameworks).reduce((res, name) => { res[name] = []; return res; }, {}),
      loaded: false
    };
  }

  componentWillMount () {
    const { npmPackages } = this.state;

    npmApiDownloadsRange('last-year', npmPackages)
      .then(downloads => this.setState({ downloads }))
      .then(() => this.setState({ loaded: true }));
  }

  renderSeries (pkgName) {
    const meta = this.state.frameworks[pkgName];
    const data = this.state.downloads[pkgName];
    return (
      <LineSeries {...meta} data={data} key={pkgName} />
    );
  }

  render() {
    const { npmPackages, now, loaded } = this.state;

    return (
      <div className="app">
        <HighchartsChart plotOptions={plotOptions}>
          <Title>Display "Fetching data..." Until Async Task Completes</Title>

          <Subtitle>NPM Download Stats of Selected Front End Frameworks. Source: api.npmjs.org</Subtitle>

          <Loading isLoading={!loaded}>Fetching data...</Loading>

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <Tooltip shared />

          <XAxis type="datetime" min={now - YEAR_MS} max={now}>
            <XAxis.Title>Date</XAxis.Title>
          </XAxis>

          <YAxis min={0} max={1.5e6}>
            <YAxis.Title>Number of downloads</YAxis.Title>
            {npmPackages.map(this.renderSeries)}
          </YAxis>
        </HighchartsChart>

        <ExampleCode name="Loading">{code}</ExampleCode>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);
