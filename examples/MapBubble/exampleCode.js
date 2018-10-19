export default `// Fetch from 'react-request' library

<Fetch url="http://code.highcharts.com/mapdata/countries/us/us-all.geo.json">
  {({ fetching, failed, data }) => {
    if (fetching) return <div>Loading…</div>
    if (failed) return <div>Failed to load map.</div>

    if (data) {
      return (
        <HighchartsMapChart map={data}>
          <Title>Highmaps lat/lon demo</Title>

          <Subtitle>US State Capitals</Subtitle>

          <XAxis crosshair={{ snap: false }} />

          <YAxis crosshair={{ snap: false }}>
            <MapSeries
              mapData={data}
              borderColor="#606060"
              nullColor="rgba(200, 200, 200, 0.2)"
              showInLegend={false}
            />

            <MapLineSeries
              data={Highmaps.geojson(data, 'mapline')}
              color="gray"
              enableMouseTracking={false}
              showInLegend={false}
            />

            <MapBubbleSeries
              dataLabels={{
                enabled: true,
                format: '{point.capital}'
              }}
              color={Highmaps.defaultOptions.colors[0]}
              name="State Capitals"
              data={populationData}
              maxSize="12%"
            />
          </YAxis>

          <MapNavigation>
            <MapNavigation.ZoomIn />
            <MapNavigation.ZoomOut />
          </MapNavigation>

          <Tooltip pointFormat='{point.capital}, {point.parentState}: <b>{point.z}</b><br/>' />

          <Credits />

          <Legend />
        </HighchartsMapChart>
      )
    }

    return null
  }}
</Fetch>

// Remember to inject Highmaps to exported component
export default withHighmaps(MyComponent, Highmaps);`
