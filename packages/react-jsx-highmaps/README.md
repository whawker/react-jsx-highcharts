# React JSX Highmaps

This package exposes everything from `react-jsx-highcharts`, but additionally provides components for building Highcharts **maps**.

## Introduction

A project for integrating [Highmaps](https://github.com/highcharts/highcharts) into a React app, with proper React components for each Highmaps component. Inspired by [Recharts](https://github.com/recharts/recharts), but for Highmaps, obviously.

## Installation

`npm install --save react-jsx-highmaps`

You'll need the peer dependencies too

`npm install --save react react-dom prop-types highcharts@^6.0.0`

## Getting started

The intention of this library is to provide a very thin abstraction of Highmaps using React components. This has been achieved by passing configuration options as component props.

In the vast majority of cases, the name of the configuration option, and the name of the component prop are the same.

#### Example

`<Tooltip />` component
```jsx
<Tooltip padding={10} hideDelay={250} shape="square" split />
```
This corresponds to the Highcharts' [`tooltip`](http://api.highcharts.com/highcharts/tooltip) configuration of
```js
tooltip: {
  enabled: true, // This is assumed when component is mounted
  padding: 10,
  hideDelay: 250,
  shape: 'square',
  split: true
}
```
We aim to pass all configuration options using the same name, so we use [Highcharts' documentation](http://api.highcharts.com/highcharts) to figure out how to achieve the same with React JSX Highcharts.

### Note:

There are **two** exceptions to the above;

#### Exception 1

Where Highcharts **events** are concerned - instead of passing `events` as an object, we use the React convention *onEventName*.

## Example

```jsx
// Import Highmaps from Highcharts
// import Highcharts from 'highcharts/highmaps'

render () {
  return (
    <HighchartsMapChart map="custom/europe">
      <Title>Nordic countries</Title>

      <Subtitle>Demo of drawing all areas in the map, only highlighting partial data</Subtitle>

      <XAxis />

      <YAxis >
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
            formatter: labelFormatter
          }}
        />
      </YAxis>

      <MapNavigation>
        <MapNavigation.ZoomIn />
        <MapNavigation.ZoomOut />
      </MapNavigation>

      <Tooltip />

      <Credits />
    </HighchartsMapChart>
  );
}

// Provide Highcharts (Highmaps) object for library to interact with
export default withHighcharts(MyComponent, Highcharts);
```

## More info

[See here](https://www.npmjs.com/package/react-jsx-highcharts)
