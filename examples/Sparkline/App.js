import React, { Component } from 'react';
import {
  HighchartsSparkline, AreaSeries, Tooltip
} from 'react-jsx-highcharts';
import Highcharts from 'highstock-release';
import mapValues from 'lodash.mapvalues';
import ExampleCode from '../utils/ExampleCode';
import code from './exampleCode';
import './index.css';

Highcharts.setOptions({
  lang: { thousandsSep: ',' }
});

const npmApiDownloadsTotal = (period, packages) => {
  return fetch(`https://api.npmjs.org/downloads/point/${period}/${packages.join(',')}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(res => {
      return mapValues(res, pkg => pkg.downloads.toLocaleString());
    });
};

const npmApiDownloadsRange = (period, packages) => {
  return fetch(`https://api.npmjs.org/downloads/range/${period}/${packages.join(',')}`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(res => {
      return mapValues(res, pkg => {
        return pkg.downloads.map(d => [ d.day, d.downloads ]);
      });
    });
};

class App extends Component {

  constructor (props) {
    super(props);

    this.renderTableRow = this.renderTableRow.bind(this);
    this.renderSparklineDefault = this.renderSparklineDefault.bind(this);
    this.renderSparklineWithTooltip = this.renderSparklineWithTooltip.bind(this);

    this.state = {
      npmPackages: [
        'highcharts',
        'highcharts-release',
        'highstock-release',
        'react-jsx-highcharts'
      ]
    };
  }

  componentWillMount () {
    const { npmPackages } = this.state;

    npmApiDownloadsTotal('last-week', npmPackages).then(weekTotals => this.setState({ weekTotals }));
    npmApiDownloadsRange('last-week', npmPackages).then(weekDownloads => this.setState({ weekDownloads }));
    npmApiDownloadsTotal('last-month', npmPackages).then(monthTotals => this.setState({ monthTotals }));
    npmApiDownloadsRange('last-month', npmPackages).then(monthDownloads => this.setState({ monthDownloads }));
  }

  renderTableRow (pkgName) {
    const { weekTotals, weekDownloads, monthTotals, monthDownloads } = this.state;

    return (
      <tr key={pkgName}>
        <td><code>{pkgName}</code></td>
        <td>{weekTotals[pkgName]}</td>
        <td>{this.renderSparklineDefault('Downloads', weekDownloads[pkgName])}</td>
        <td>{monthTotals[pkgName]}</td>
        <td>{this.renderSparklineWithTooltip('Downloads', monthDownloads[pkgName])}</td>
      </tr>
    );
  }

  renderSparklineDefault (pkgName, data) {
    return (
      <HighchartsSparkline>
        <AreaSeries id={pkgName} data={data} />
      </HighchartsSparkline>
    );
  }

  renderSparklineWithTooltip (name, data) {
    const positioner = (w, h, point) => ({ x: point.plotX - w / 2, y: point.plotY - h });

    return (
      <HighchartsSparkline
        series={
          <AreaSeries id={name} name={name} data={data} color="#C12127" />
        }>
        <Tooltip
          useHTML
          borderWidth={1}
          shadow={false}
          hideDelay={0}
          padding={8}
          headerFormat={`<b>${name}:</b> `}
          pointFormat={'{point.y:,.0f}'}
          positioner={positioner} />
      </HighchartsSparkline>
    );
  }

  render() {
    const { npmPackages, weekTotals, weekDownloads, monthTotals, monthDownloads } = this.state;
    if (!weekTotals || !weekDownloads || !monthTotals || !monthDownloads) return null;

    return (
      <div className="app">
        <h1 className="text-center">Sparkline Demo</h1>
        <p className="text-center">Download stats of selected NPM packages</p>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>NPM Package</th>
              <th>7 Day Total</th>
              <th>7 Day Sparkline</th>
              <th>30 Day Total</th>
              <th>
                30 Day Sparkline <small>(w/ tooltip)</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {npmPackages.map(this.renderTableRow)}
          </tbody>
        </table>

        <ExampleCode name="Sparkline">{code}</ExampleCode>
      </div>
    );
  }
}

export default App;
