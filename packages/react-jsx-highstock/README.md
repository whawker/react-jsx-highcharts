# react-jsx-highstock

This package exposes everything from `react-jsx-highcharts`, but additionally provides components for building **Highstock** charts.

N.B. You can build *both* Highcharts **and** Highstock charts from this package.

As of 1.2.0 React JSX Highstock supports using [Immutable.js](https://facebook.github.io/immutable-js/) data structures as Series data.

As of 2.x you are required to use the `withHighcharts` HOC to inject the Highcharts object (see below)

## Upgrading from 1.x to 2.x

React JSX Highstock now **requires** the `withHighcharts` higher order component to render your chart components. This HOC allows you to inject the Highcharts object the library will interact with.
This means we can use Highcharts in styled mode (style by CSS) - see [example](https://whawker.github.io/react-jsx-highcharts/examples/StyleByCSS/index.html), or perform customisations to the Highcharts object before using it.

Furthermore this approach allows us to simplify the peer-dependencies, so React JSX Highstock **now has a peer-dependency of `highcharts`, rather than `highstock-release`**

Using 1.x your code would have looked something like

```jsx
import { HighchartsStockChart, Chart, /* etc... */ } from 'react-jsx-highstock';
import Highcharts from 'highstock-release';

const MyChart = () => (
  <HighchartsStockChart>
    <Chart />
    // etc
  </HighchartsStockChart>
);

export default MyChart
```

But with 2.x you need to
 - Import Highstock via `highcharts` (note the Highcharts import)
 - use `withHighcharts`, when exporting the component (note the last line)

```jsx
import { withHighcharts, HighchartsStockChart, Chart, /* etc... */ } from 'react-jsx-highstock';
import Highcharts from 'highcharts/highstock';

const MyChart = () => (
  <HighchartsStockChart>
    <Chart />
    // etc
  </HighchartsStockChart>
);

export default withHighcharts(MyChart, Highcharts); // Injecting the Highstock object
```

## Example

```jsx
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

      <YAxis id="price">
        <YAxis.Title>Price</YAxis.Title>
        <AreaSplineSeries id="profit" name="Profit" data={data1} />
      </YAxis>

      <YAxis id="social" opposite>
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

// Provide Highcharts object for library to interact with
export default withHighcharts(MyComponent, Highcharts);
```

## More info

[See here](https://www.npmjs.com/package/react-jsx-highcharts)
