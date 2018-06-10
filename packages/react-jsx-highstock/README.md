![React JSX Highstock](https://user-images.githubusercontent.com/2003804/40682476-c1ea6be4-6383-11e8-826c-a617db5ef726.png)

This package exposes everything from `react-jsx-highcharts`, but additionally provides components for building **Highstock** charts.

N.B. You can build *both* Highcharts **and** Highstock charts from this package.

## Introduction

A project for integrating [Highcharts](https://github.com/highcharts/highcharts) into a React app, with proper React components for each Highcharts/Highstock component. Inspired by [Recharts](https://github.com/recharts/recharts), but for Highcharts, obviously.

## Why React JSX Highstock?

Unlike other React Highcharts wrapper libraries, **React JSX Highcharts** is designed to be dynamic - it is optimised for *interactive* charts that need to adapt to business logic in your React application.

Other Highcharts wrappers completely destroy and recreate the chart when the configuration options change, which is *very* wasteful and inefficient.

React JSX Highcharts uses a different approach, by providing React components for each Highcharts component, we can observe exactly which prop has changed and call the optimal Highcharts method behind the scenes.

For example, if the `data` prop were to change on a `<Series />` component, React JSX Highcharts can follow Highcharts best practices and use the `setData` method rather than the more expensive `update`.

React JSX Highcharts also enables you to write your *own* Highcharts components, via it's powerful higher order components.

## Installation

`npm install --save react-jsx-highstock`

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

## Example

```jsx
// Import Highstock from Highcharts
// import Highcharts from 'highcharts/highstock'

render () {
  return (
    <HighchartsStockChart>
      <Chart onClick={this.handleClick} zoomType="x" />

      <Title>Highstocks Example</Title>

      <Legend>
        <Legend.Title>Key</Legend.Title>
      </Legend>

      <RangeSelector>
        <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
        <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
        <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
        <RangeSelector.Button type="all">All</RangeSelector.Button>
        <RangeSelector.Input boxBorderColor="#7cb5ec" />
      </RangeSelector>

      <Tooltip />

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
    );
}

// Provide Highcharts (Highstock) object for library to interact with
export default withHighcharts(MyComponent, Highcharts);
```

## Demos

[See here](https://whawker.github.io/react-jsx-highcharts/examples/index.html)

## Documentation

In progress... [see here](https://github.com/whawker/react-jsx-highcharts/wiki).

## Upgrading from 2.x to 3.x

For the vast majority of cases, **if your chart works in v2 of React JSX Highstock it should work in v3 without any required changes**.

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

As of 1.2.0 React JSX Highstock supports using [Immutable.js](https://facebook.github.io/immutable-js/) data structures as Series data.

## Common issues

**Uncaught TypeError: Cannot read property 'stockChart' of undefined**

You are probably importing High*charts* rather than High*stock*. Change you Highcharts import to...
```js
import Highcharts from 'highcharts/highstock';
```

**Highcharts error #17**

You likely need to add an extra Highcharts module to support the requested series type, this is usually Highcharts more.

```js
import Highcharts from 'highcharts/highstock';
import addHighchartsMore from 'highcharts/highcharts-more';

addHighchartsMore(Highcharts);
```

## More info

[See here](https://www.npmjs.com/package/react-jsx-highcharts)
