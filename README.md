![React JSX Highcharts](https://user-images.githubusercontent.com/2003804/40681848-2d0f5ce2-6382-11e8-8ce9-cd49c409ad2e.png)

## Introduction

A project for integrating [Highcharts](https://github.com/highcharts/highcharts) into a React app, with proper React components for each Highcharts/Highstock component. Inspired by [Recharts](https://github.com/recharts/recharts), but for Highcharts, obviously.

## Why React JSX Highcharts?

Unlike other React Highcharts wrapper libraries, **React JSX Highcharts** is designed to be dynamic - it is optimised for *interactive* charts that need to adapt to business logic in your React application.

Other Highcharts wrappers completely destroy and recreate the chart when the configuration options change, which is *very* wasteful and inefficient.

React JSX Highcharts uses a different approach, by providing React components for each Highcharts component, we can observe exactly which prop has changed and call the optimal Highcharts method behind the scenes.

For example, if the `data` prop were to change on a `<Series />` component, React JSX Highcharts can follow Highcharts best practices and use the `setData` method rather than the more expensive `update`.

React JSX Highcharts also enables you to write your *own* Highcharts components, via it's powerful higher order components.

## Installation

`npm install --save react-jsx-highcharts`

You'll need the peer dependencies too

`npm install --save react react-dom prop-types highcharts@^6.0.0`

## Getting started

The intention of this library is to provide a very thin abstraction of Highcharts using React components. This has been achieved by passing Highcharts configuration options as component props.

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

#### Example
```jsx

<SplineSeries id="my-series" data={myData} onHide={this.handleHide} onShow={this.handleShow} />
```
This would correspond to the Highcharts configuration
```js
series: [{
  type: 'spline',
  id: 'my-series',
  data: myData,
  events: { hide: this.handleHide, show: this.handleShow }
}]
```

#### Exception 2

`text` configuration options are passed as a React child

#### Example

```jsx
<Title>Some Text Here</Title>
```

This would correspond to the Highcharts configuration
```js
title: {
  text: 'Some Text Here'
}
```

## Example

```jsx
render () {
  return (
    <HighchartsChart>
      <Chart />

      <Title>Solar Employment Growth by Sector, 2010-2016</Title>

      <Subtitle>Source: thesolarfoundation.com</Subtitle>

      <Legend layout="vertical" align="right" verticalAlign="middle" />

      <XAxis>
        <XAxis.Title>Time</XAxis.Title>
      </XAxis>

      <YAxis>
        <YAxis.Title>Number of employees</YAxis.Title>
        <LineSeries name="Installation" data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} />
        <LineSeries name="Manufacturing" data={[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]} />
        <LineSeries name="Sales & Distribution" data={[11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]} />
        <LineSeries name="Project Development" data={[null, null, 7988, 12169, 15112, 22452, 34400, 34227]} />
        <LineSeries name="Other" data={[12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]} />
      </YAxis>
    </HighchartsChart>
  );
}

// Provide Highcharts object for library to interact with
export default withHighcharts(MyComponent, Highcharts);
```

## Demos

[See here](https://whawker.github.io/react-jsx-highcharts/examples/index.html)

## Documentation

In progress... [see here](https://github.com/whawker/react-jsx-highcharts/wiki).

## Upgrading from 2.x to 3.x

For the vast majority of cases, **if your chart works in v2 of React JSX Highcharts it should work in v3 without any required changes**.

Ok, so what about the minority of cases?

### Dropped React 15 support

v3 is built on top of the new Context API added in [React 16.3](https://reactjs.org/blog/2018/03/29/react-v-16-3.html#official-context-api), using the fantastic [create-react-context](https://www.npmjs.com/package/create-react-context) polyfill for previous React 16 versions.

While polyfills for React 15 exist, I want to minimise the amount of use cases supported, going forward.

### Updates to the Higher Order components (Providers)

This is an advanced feature, but if this impacts you, [see the guide here](https://github.com/whawker/react-jsx-highcharts/wiki/Upgrading-from-2.x-to-3.x#updates-to-the-higher-order-components-providers)

## Upgrading from 1.x to 2.x

See the guide [here](https://github.com/whawker/react-jsx-highcharts/wiki/Upgrading-from-1.x-to-2.x)

## Changelog

As of 3.x you are no longer required to use IDs for Axis, Series and PlotLines/Bands

As of 2.1.0 Highcharts 6 is supported

As of 2.x you are required to use the `withHighcharts` HOC to inject the Highcharts object (see below)

As of 1.3.0 React JSX Highcharts supports [3D charts](https://whawker.github.io/react-jsx-highcharts/examples/3DChart/index.html).

As of 1.2.0 React JSX Highcharts supports using [Immutable.js](https://facebook.github.io/immutable-js/) data structures as Series data.

## Goals

This project aims to hide the complexity of Highcharts from the React application author, allowing the rendering of charts in a React familiar way.

It also aims to use best React and Highcharts practices where possible - for example if the `data` prop of a Series were to change React JSX Highcharts uses the [`Series.prototype.setData`](http://api.highcharts.com/highstock/Series.setData) method of Highcharts which is much less expensive than `update`.

Additionally we avoid passing large JSON configuration objects as props, as this leads to painful debugging when trying to work out why your component did or did not re-render, this also helps as an abstraction over the complexity as mentioned above.

## Technical approach

Rather than passing around a chart object between all the components, we utilise [React's context](https://facebook.github.io/react/docs/context.html) to share the chart object around, then using [Higher Order Components](https://medium.com/@mweststrate/how-to-safely-use-react-context-b7e343eff076) (HOCs), we inject the Highcharts functions we need to the wrapped component.

There are 3 HOCs in this project, [provideChart](https://github.com/whawker/react-jsx-highcharts/blob/master/packages/react-jsx-highcharts/src/components/ChartProvider/index.js), [provideAxis](https://github.com/whawker/react-jsx-highcharts/blob/master/packages/react-jsx-highcharts/src/components/AxisProvider/index.js) and [provideSeries](https://github.com/whawker/react-jsx-highcharts/blob/master/packages/react-jsx-highcharts/src/components/SeriesProvider/index.js).

In the vast majority of cases, there is no need to use these HOCs directly - but they have been exposed anyway - they are useful if you want to create your own components with this library.

## Common issues

**Uncaught TypeError: Cannot read property 'chart' of undefined**

You need to use the `withHighcharts` higher order component to inject the Highcharts object. [See here](https://github.com/whawker/react-jsx-highcharts/wiki/Higher-Order-Components#withhighcharts-version-200)

**Uncaught TypeError: Cannot read property 'stockChart' of undefined**

As above, or you are importing High*charts* rather than High*stock*. Change you Highcharts import to...
```js
import Highcharts from 'highcharts/highstock';
```

**Highcharts error #17**

You likely need to add an extra Highcharts module to support the requested series type, this is usually Highcharts more.

```js
import Highcharts from 'highcharts';
import addHighchartsMore from 'highcharts/highcharts-more';

addHighchartsMore(Highcharts);
```

Alternatively it may be the Heatmap, Treemap, Sankey, [or one of these](https://github.com/highcharts/highcharts/tree/master/js/modules) extra modules.

```js
import Highcharts from 'highcharts';
import addHeatmapModule from 'highcharts/modules/heatmap';
import addTreemapModule from 'highcharts/modules/treemap';

addHeatmapModule(Highcharts);
addTreemapModule(Highcharts);
```

**I updated the data of my chart series, and the chart did not update**

As Objects and Arrays are passed by reference, React thought your component props had not changed. You should clone the data object before modifying it. See the [`addDataPoint`](https://github.com/whawker/react-jsx-highcharts/blob/master/examples/utils/data-helpers.js#L19-L20) utility function used in the demos as an example.

**My stock chart isn't rendering the Navigator and RangeSelector components**

You're probably using a `<HighchartsChart />` at the top level, rather than a `<HighchartsStockChart />`, otherwise please post an issue.
