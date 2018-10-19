export default `// Fetch from 'react-request' library

<Fetch url="https://code.highcharts.com/mapdata/custom/europe.geo.json">
  {({ fetching, failed, data }) => {
    if (fetching) return <div>Loading…</div>
    if (failed) return <div>Failed to load map.</div>

    if (data) {
      return (
        <HighchartsMapChart map={data}>
          <Title>Nordic countries</Title>

          <Subtitle>Demo of drawing all areas in the map, only highlighting partial data</Subtitle>

          <MapSeries
            name="Area"
            data={[
              ['is', 1],
              ['no', 1],
              ['se', 1],
              ['dk', 1],
              ['fi', 1]
            ]}
            dataLabels={{
              enabled: true,
              color: '#FFFFFF',
              format: '{point.name}'
            }}
          />

          <MapNavigation>
            <MapNavigation.ZoomIn/>
            <MapNavigation.ZoomOut/>
          </MapNavigation>

          <Tooltip/>

          <Credits/>
        </HighchartsMapChart>
      )
    }

    return null
  }}
</Fetch>

// Remember to inject Highmaps to exported component
export default withHighmaps(MyComponent, Highmaps);`
