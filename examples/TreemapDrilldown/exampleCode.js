export default `
render () {
  const treeData = this.state.treeData;
  if (!treeData) return null;

  const levels = [{
    level: 1,
    dataLabels: {
      enabled: true
    },
    borderWidth: 3
  }];
  const tooltipFormatter = function () {
    return \`\${this.key}: \${this.point.value}\`;
  };

  return (
    <div className="app">
      <HighchartsChart>
        <Title>Global Mortality Rate 2012, per 100,000 population</Title>

        <Subtitle>Click points to drill down. Source: WHO.</Subtitle>

        <XAxis />

        <YAxis>
          <TreemapSeries
            data={treeData}
            allowDrillToNode
            layoutAlgorithm="squarified"
            animationLimit={1000}
            dataLabels={{ enabled: false }}
            levelIsConstant={false}
            levels={levels} />
        </YAxis>

        <Tooltip formatter={tooltipFormatter} />
      </HighchartsChart>
    </div>
  );
}

// Remember to inject Highcharts to exported component
export default withHighcharts(MyComponent, Highcharts);`;
