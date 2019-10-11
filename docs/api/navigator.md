---
id: navigator
title: Navigator
sidebar_label: Navigator
---

The navigator is a small series below the main series, displaying a view of the entire data set. It provides tools to zoom in and out on parts of the data as well as panning across the dataset.

[ Highstock navigator reference](https://api.highcharts.com/highstock/navigator)

## Usage

```jsx
<HighchartsStockChart>
  <Chart zoomType="x" />

  <XAxis>
    <XAxis.Title>Time</XAxis.Title>
  </XAxis>

  <YAxis>
    <YAxis.Title>Price</YAxis.Title>
    <AreaSplineSeries id="profit" name="Profit" data={data1} />
  </YAxis>

  <YAxis opposite>
    <YAxis.Title>Social Buzz</YAxis.Title>
    <SplineSeries id="twitter" name="Twitter mentions" data={data2} />
  </YAxis>

  <Navigator>
    <Navigator.Series seriesId="profit" />
    <Navigator.Series seriesId="twitter" />
  </Navigator>
</HighchartsStockChart>
```
