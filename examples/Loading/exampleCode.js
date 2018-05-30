export default `
const frameworks = {
  react:          { name: 'React',    color: '#61dafb' },
  angular:        { name: 'Angular',  color: '#dd1b16' },
  vue:            { name: 'Vue.js',   color: '#42b983' },
  'ember-source': { name: 'Ember.js', color: '#dd6a58' },
  preact:         { name: 'Preact',   color: '#673ab8' }
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
        <HighchartsChart>
          <Title>Display "Fetching data..." Until Async Task Completes</Title>

          <Subtitle>NPM Download Stats of Selected Front End Frameworks. Source: api.npmjs.org</Subtitle>

          <Loading isLoading={!loaded}>Fetching data...</Loading>

          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <Tooltip shared />

          <XAxis type="datetime" min={now - YEAR_MS} max={now}>
            <XAxis.Title>Date</XAxis.Title>
          </XAxis>

          <YAxis min={0} max={500000}>
            <YAxis.Title>Number of downloads</YAxis.Title>
            {npmPackages.map(this.renderSeries)}
          </YAxis>
        </HighchartsChart>
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);`;
