![React JSX Highmaps](https://user-images.githubusercontent.com/2003804/47213017-ac588080-d391-11e8-8711-9e7c4e2fadec.png)

[![Build Status](https://travis-ci.com/whawker/react-jsx-highcharts.svg?branch=master)](https://travis-ci.com/whawker/react-jsx-highcharts) ![npm version](https://img.shields.io/npm/v/react-jsx-highmaps.svg) [![dependencies Status](https://david-dm.org/whawker/react-jsx-highcharts/status.svg?path=packages/react-jsx-highmaps)](https://david-dm.org/whawker/react-jsx-highcharts?path=packages/react-jsx-highmaps)

## Introduction

A project for integrating [Highmaps](https://github.com/highcharts/highcharts) into a React app, with proper React components for each Highmaps component. Inspired by [Recharts](https://github.com/recharts/recharts), but for Highmaps, obviously.

## Installation

`npm install --save react-jsx-highmaps`

You'll need the peer dependencies too

`npm install --save react react-dom prop-types highcharts@^9.0.0`

## Licensing

React JSX Highmaps is free to use, however **Highcharts** itself requires a license for **commercial** use. [Highcharts license FAQs](https://shop.highsoft.com/faq).

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

Where Highcharts **events** are concerned - instead of passing `events` as an object, we use the React convention _onEventName_.

#### Example

```jsx
<MapBubbleSeries
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
    type: 'mapbubble',
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
// import Highmaps from 'highcharts/highmaps' - Import Highmaps from Highcharts
// import { Fetch } from 'react-request'

const MyMapChart = (props) => (
  <HighmapsProvider Highcharts={Highmaps}>
    <Fetch url="https://code.highcharts.com/mapdata/custom/europe.geo.json">
      {({ fetching, failed, data }) => {
        if (fetching) return <div>Loading…</div>
        if (failed) return <div>Failed to load map.</div>

        if (data) {
          return (
            <HighchartsMapChart map={data}>
              <Title>Nordic countries</Title>

              <MapSeries
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
  </HighmapsProvider>
);
```

## More info

[See here](https://www.npmjs.com/package/react-jsx-highcharts)
