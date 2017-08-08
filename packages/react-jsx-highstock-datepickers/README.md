# react-jsx-highstock-datepickers

[React Day Pickers](http://react-day-picker.js.org/) for [React JSX Highstock](https://github.com/whawker/react-jsx-highcharts/tree/master/packages/react-jsx-highstock#readme) as a drop in replacement for the default Highstock `rangeSelector.input` field.

# Usage

```jsx
import DateRangePickers from 'react-jsx-highstock-datepickers;

render () {
  return (
     <HighchartsStockChart>
       // Omitted

       <DateRangePickers axisId="xAxis" />

     </HighchartsStockChart>
  );
}
```

## Required props

#### `axisId`
In 99% of cases, this will be `xAxis` - these default ID for an X axis in React JSX Highstock, unless you are using a custom axis ID.

## Optional Props

#### `dayFormat`
The date format to be displayed in the Date Picker input boxes

* Defaults to `DD MMM YYYY` i.e. 07 Aug 2017
* Change be any format supported by moment.js

#### `fromLabel`
The text displayed next to the "From" input box.

* Defaults to Highcharts [`lang.rangeSelectorFrom`](http://api.highcharts.com/highstock/lang.rangeSelectorFrom)

#### `toLabel`
The text displayed next to the "To" input box.

* Defaults to Highcharts [`lang.rangeSelectorTo`](http://api.highcharts.com/highstock/lang.rangeSelectorTo)

#### `onChangeFromDate`
Allows you to add a custom callback when the From date is changed

* Defaults to `() => {}` (nothing)

#### `onChangeToDate`
Allows you to add a custom callback when the To date is changed

* Defaults to `() => {}` (nothing)

#### `datePickerClassNames`
Allow you to pass config through to React Day Picker's [`classNames`](https://github.com/gpbl/react-day-picker/blob/master/docs/docs/api-input.md#classnames) prop

All other props will be passed straight through to React Day Picker.

## Localisation props

#### `locale`
The language code for the current locale

* Defaults to `en`

#### `months`
The month names to use

* Defaults to Highcharts [`lang.months`](http://api.highcharts.com/highstock/lang.months)

#### `weekdaysLong`
The long weekdays names to use

* Defaults to Highcharts [`lang.weekdays`](http://api.highcharts.com/highstock/lang.weekdays)

#### `weekdaysShort`
The short weekdays names to use

* Defaults to Highcharts [`lang.shortWeekdays`](http://api.highcharts.com/highstock/lang.shortWeekdays)


