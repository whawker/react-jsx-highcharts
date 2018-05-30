export default `
Highcharts.Pointer.prototype.reset = () => {};

Highcharts.Point.prototype.highlight = function (event) {
  this.onMouseOver(); // Show the hover marker
  this.series.chart.tooltip.refresh(this); // Show the tooltip
  this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
};

class App extends Component {

  constructor(props) {
    super(props);

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.renderChart = this.renderChart.bind(this);
    this.state = {
      chartData: null
    };
  }

  componentDidMount () {
    fetch('activity.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(json => {
        this.setState({
          chartData: json
        })
      });
  }

  renderChart (dataset, index) {
    const tooltipPositioner = function () {
      return { x: this.chart.chartWidth - this.label.width, y: 10 };
    };
    const data = dataset.data.map((val, i) => [this.state.chartData.xData[i], val]);
    const colour = Highcharts.getOptions().colors[index];

    return (
      <HighchartsChart key={index}>
        <Title align="left" margin={30} x={30}>{dataset.name}</Title>
        <XAxis crosshair labels={{format: '{value} km'}} />
        <YAxis>
          <Series
            name={dataset.name}
            type={dataset.type}
            data={data}
            color={colour}
            tooltip={{ valueSuffix: \` \${dataset.unit}\` }} />
        </YAxis>

        <Tooltip
          positioner={tooltipPositioner}
          borderWidth={0}
          backgroundColor="none"
          pointFormat="{point.y}"
          headerFormat=""
          shadow={false}
          style={{ fontSize: '18px' }}
          valueDecimals={dataset.valueDecimals} />
      </HighchartsChart>
    );
  }

  handleMouseMove (e) {
    let point = null;
    let event = null;

    Highcharts.charts.forEach(chart => {
      event = chart.pointer.normalize(e); // Find coordinates within the chart
      point = chart.series[0].searchPoint(event, true); // Get the hovered point
      if (point) {
        point.highlight(e);
      }
    });
  }

  render () {
    const { chartData } = this.state;
    if (!chartData) return null;

    return (
      <div className="app" onMouseMove={this.handleMouseMove}>
        {chartData.datasets.map(this.renderChart)}
      </div>
    );
  }
}

export default withHighcharts(App, Highcharts);`;
