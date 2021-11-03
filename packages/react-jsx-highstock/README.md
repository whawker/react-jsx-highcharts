![React JSX Highstock](https://user-images.githubusercontent.com/2003804/40682476-c1ea6be4-6383-11e8-826c-a617db5ef726.png)

[![Build Status](https://travis-ci.com/whawker/react-jsx-highcharts.svg?branch=master)](https://travis-ci.com/whawker/react-jsx-highcharts) ![npm version](https://img.shields.io/npm/v/react-jsx-highstock.svg) [![dependencies Status](https://david-dm.org/whawker/react-jsx-highcharts/status.svg?path=packages/react-jsx-highstock)](https://david-dm.org/whawker/react-jsx-highcharts?path=packages/react-jsx-highstock)

This package exposes everything from `react-jsx-highcharts`, but additionally provides components for building **Highstock** charts. It is encouraged to familiarize yourself with both READMEs.

N.B. You can build _both_ Highcharts **and** Highstock charts from this package.

## Introduction

A project for integrating [Highcharts](https://github.com/highcharts/highcharts) into a React app, with proper React components for each Highcharts/Highstock component. Inspired by [Recharts](https://github.com/recharts/recharts), but for Highcharts, obviously.

## Why React JSX Highstock?

Unlike other React Highcharts wrapper libraries, **React JSX Highcharts** is designed to be dynamic - it is optimised for _interactive_ charts that need to adapt to business logic in your React application.

Other Highcharts wrappers completely destroy and recreate the chart when the configuration options change, which is _very_ wasteful and inefficient.

React JSX Highcharts uses a different approach, by providing React components for each Highcharts component, we can observe exactly which prop has changed and call the optimal Highcharts method behind the scenes.

For example, if the `data` prop were to change on a `<Series />` component, React JSX Highcharts can follow Highcharts best practices and use the `setData` method rather than the more expensive `update`.

React JSX Highcharts also enables you to write your _own_ Highcharts components, via its exposed hooks.

## Installation

`npm install --save react-jsx-highstock`

You'll need the peer dependencies too

`npm install --save react react-dom prop-types highcharts@^9.0.0`

## Licensing

React JSX Highstock is free to use, however **Highcharts** itself requires a license for **commercial** use. [Highcharts license FAQs](https://shop.highsoft.com/faq).

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

Where Highcharts **events** are concerned - instead of passing `events` as an object, we use the React convention _onEventName_.

#### Example

```jsx
<SplineSeries
  id="my-series"
  data={myData}
  onHide={this.handleHide}
  onShow={this.handleShow}
/>
```

This would correspond to the Highcharts configuration

```js
series: [
  {
    type: 'spline',
    id: 'my-series',
    data: myData,
    events: { hide: this.handleHide, show: this.handleShow }
  }
];
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
  text: 'Some Text Here';
}
```

## Example

```jsx
// import Highcharts from 'highcharts/highstock' - Import Highstock from Highcharts

const MyChart = (props) => (
  <HighchartsProvider Highcharts={Highcharts}>
    <HighchartsStockChart>
      <Chart onClick={this.handleClick} zoomType="x" />

      <Title>Highstocks Example</Title>

      <Legend>
        <Legend.Title>Key</Legend.Title>
      </Legend>

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

      <RangeSelector>
        <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
        <RangeSelector.Button count={7} type="day">7d</RangeSelector.Button>
        <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
        <RangeSelector.Button type="all">All</RangeSelector.Button>
        <RangeSelector.Input boxBorderColor="#7cb5ec" />
      </RangeSelector>

      <Navigator>
        <Navigator.Series seriesId="profit" />
        <Navigator.Series seriesId="twitter" />
      </Navigator>
    </HighchartsStockChart>
  </HighchartsProvider>
);
```

## Demos

[See here](https://codesandbox.io/s/github/whawker/react-jsx-highcharts-examples)

## Documentation

In progress... [see here](https://github.com/whawker/react-jsx-highcharts/wiki).

## Upgrading from 3.x to 4.x

For the vast majority of cases, **if your chart works in v3 of React JSX Highstock it should work in v4 without any required changes** (assuming the React version you're using supports Hooks).

Ok, so what about the minority of cases? Check out the list of [breaking changes](https://github.com/whawker/react-jsx-highcharts/releases/tag/v4.0.0).

## Changelog

As of [4.x](https://github.com/whawker/react-jsx-highcharts/releases/tag/v4.0.0) the library has been completely rewritten to use React Hooks (with [very few changes](https://github.com/whawker/react-jsx-highcharts/releases/tag/v4.0.0) to the public API)

As of [3.x](https://github.com/whawker/react-jsx-highcharts/releases/tag/v3.0.0) you are no longer required to use IDs for Axis, Series and PlotLines/Bands

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
