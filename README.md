![React JSX Highcharts](https://user-images.githubusercontent.com/2003804/40681848-2d0f5ce2-6382-11e8-8ce9-cd49c409ad2e.png)

[![Build Status](https://travis-ci.com/whawker/react-jsx-highcharts.svg?branch=master)](https://travis-ci.com/whawker/react-jsx-highcharts)

[Highcharts](https://github.com/highcharts/highcharts) built with **proper React components**. More that just a simple wrapper - utilises the power of React props to create dynamic charts!

React JSX Highcharts offers separate packages for each Highcharts product.

##### [Highcharts](/packages/react-jsx-highcharts)

##### [Highstock](/packages/react-jsx-highstock)

##### [Highmaps](/packages/react-jsx-highmaps)

## Why React JSX Highcharts?

Unlike other React Highcharts wrapper libraries, **React JSX Highcharts** is designed to be dynamic - it is optimised for _interactive_ charts that need to adapt to business logic in your React application.

Other Highcharts wrappers completely destroy and recreate the chart when the configuration options change, which is _very_ wasteful and inefficient.

React JSX Highcharts uses a different approach. By providing React components for each Highcharts component, we can observe exactly which prop has changed and call the optimal Highcharts method behind the scenes. For example, if the `data` prop were to change on a `<Series />` component, React JSX Highcharts can follow Highcharts best practices and use the `setData` method rather than the more expensive `update`.

React JSX Highcharts also enables you to write your _own_ Highcharts components, via its exposed hooks.

## Installation

```sh
# Install the appropriate React JSX package
npm install --save react-jsx-highcharts
#               or react-jsx-highstock
#               or react-jsx-highmaps

# And the peer dependencies
npm install --save react react-dom prop-types highcharts@^9.0.0
```

## Licensing

React JSX Highcharts is free to use, however **Highcharts** itself requires a license for **commercial** use. [Highcharts license FAQs](https://shop.highsoft.com/faq).

## [Documentation](https://github.com/whawker/react-jsx-highcharts/wiki)

## [Examples](https://codesandbox.io/s/github/whawker/react-jsx-highcharts-examples)

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

## Acknowledgements

Thanks to [Recharts](https://github.com/recharts/recharts) for the inspiration of building charts with separate components.

Thanks to Highcharts themselves, obviously.

Thanks to @anajavi for all the help and support in maintaining this project.
