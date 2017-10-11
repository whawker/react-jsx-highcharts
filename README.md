# react-jsx-highcharts

## Introduction

A proof of concept for integrating [Highcharts](https://github.com/highcharts/highcharts) into a React app, with proper React components for each Highcharts/Highstock component. Inspired by [Recharts](https://github.com/recharts/recharts), but for Highcharts, obviously.

As of 1.2.0 React JSX Highcharts supports using [Immutable.js](https://facebook.github.io/immutable-js/) data structures as Series data.

As of 1.3.0 React JSX Highcharts supports [3D charts](https://whawker.github.io/react-jsx-highcharts/examples/3DChart/index.html).

## Example

```jsx
<HighchartsChart plotOptions={plotOptions}>
  <Chart />

  <Title>Solar Employment Growth by Sector, 2010-2016</Title>

  <Subtitle>Source: thesolarfoundation.com</Subtitle>

  <Legend layout="vertical" align="right" verticalAlign="middle" />

  <XAxis>
    <XAxis.Title>Time</XAxis.Title>
  </XAxis>

  <YAxis id="number">
    <YAxis.Title>Number of employees</YAxis.Title>
    <LineSeries id="installation" name="Installation" data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} />
    <LineSeries id="manufacturing" name="Manufacturing" data={[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]} />
    <LineSeries id="sales-distribution" name="Sales & Distribution" data={[11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]} />
    <LineSeries id="project-development" name="Project Development" data={[null, null, 7988, 12169, 15112, 22452, 34400, 34227]} />
    <LineSeries id="other" name="Other" data={[12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]} />
  </YAxis>
</HighchartsChart>
```

## Demos

[See here](https://whawker.github.io/react-jsx-highcharts/examples/index.html)

## Getting Started

#### Highcharts
`npm install --save react-jsx-highcharts`

You'll need the peer dependencies too

`npm install --save react react-dom prop-types highcharts@^5.0.0`

#### Highstock (also includes Highcharts)
`npm install --save react-jsx-highstock`

You'll need the peer dependencies too

`npm install --save react react-dom prop-types highstock-release@^5.0.0` (note: `highstock-release`, not `highcharts`)

## Documentation
In progress... [see here](https://github.com/whawker/react-jsx-highcharts/wiki).

## Upcoming Features
* ~~`<Highcharts3dChart>` component - A helper for 3D charts.~~ Done! 1.3.0
* ~~React 16 support - all features seem to work with beta 3, just need to modify `peerDependencies` and await Enzyme support for React 16~~ Done! 1.4.0
* Use `React.PureComponent` instead of `Component`
* Highcharts 6.0 support

## Goals

This project aims to hide the complexity of Highcharts from the React application author, allowing the rendering of charts in a React familiar way. 

It also aims to use best React and Highcharts practices where possible - for example if the `data` prop of a Series were to change React JSX Highcharts uses the [`Series.prototype.setData`](http://api.highcharts.com/highstock/Series.setData) method of Highcharts which is much less expensive than `update`.

Additionally we avoid passing large JSON configuration objects as props, as this leads to painful debugging when trying to work out why your component did or did not re-render, this also helps as an abstraction over the complexity as mentioned above.

## Technical approach

Rather than passing around a chart object between all the components, we utilise [React's context](https://facebook.github.io/react/docs/context.html) to share the chart object around, then using [Higher Order Components](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076) (HOCs), we inject the Highcharts functions we need to the wrapped component.

There are 3 HOCs in this project, [provideChart](https://github.com/whawker/react-jsx-highcharts/blob/master/packages/react-jsx-highcharts/src/components/ChartProvider/index.js), [provideAxis](https://github.com/whawker/react-jsx-highcharts/blob/master/packages/react-jsx-highcharts/src/components/AxisProvider/index.js) and [provideSeries](https://github.com/whawker/react-jsx-highcharts/blob/master/packages/react-jsx-highcharts/src/components/SeriesProvider/index.js).

In the vast majority of cases, there is no need to use these HOCs directly - but they have been exposed anyway - they are useful if you want to create your own components with this library. 

## Common issues

**I updated the data of my chart series, and the chart did not update**

As Objects and Arrays are passed by reference, React thought your component props had not changed. You should clone the data object before modifying it. See the [`addDataPoint`](https://github.com/whawker/react-jsx-highcharts/blob/master/examples/utils/data-helpers.js#L19-L20) utility function used in the demos as an example.

**My stock chart isn't rendering the Navigator and RangeSelector components**

You're probably using a `<HighchartsChart />` at the top level, rather than a `<HighchartsStockChart />`, otherwise please post an issue.
