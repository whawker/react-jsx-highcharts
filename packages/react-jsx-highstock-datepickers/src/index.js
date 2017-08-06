import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import Highcharts from 'highstock-release';
import { provideAxis } from 'react-jsx-highstock';
import '../styles/index.css';
const ONE_DAY = 86400000;

class DateRangePickers extends Component {

  static propTypes = {
    dayFormat: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]).isRequired,
    locale: PropTypes.string.isRequired,
    onChangeFromDate: PropTypes.func.isRequired,
    onChangeToDate: PropTypes.func.isRequired,
    fromLabel: PropTypes.string,
    toLabel: PropTypes.string,
    className: PropTypes.string,
    datePickerClassNames: PropTypes.object
  };

  static defaultProps = {
    dayFormat: 'DD MMM YYYY',
    locale: 'en',
    onChangeFromDate: () => {},
    onChangeToDate: () => {},
    className: 'date-range-pickers'
  };

  constructor (props) {
    super(props);

    this.handleFromDateChange = this.handleFromDateChange.bind(this);
    this.handleToDateChange = this.handleToDateChange.bind(this);
    this.handleAfterSetExtremes = this.handleAfterSetExtremes.bind(this);

    this.state = {
      min: null,
      max: null
    };
  }

  componentWillMount () {
    const langOpts = Highcharts.getOptions().lang;
    const { months: monthsLong, weekdays, shortWeekdays, rangeSelectorFrom, rangeSelectorTo } = langOpts;

    const {
      locale,
      months = monthsLong,
      weekdaysLong = weekdays,
      weekdaysShort = shortWeekdays,
      fromLabel = rangeSelectorFrom,
      toLabel = rangeSelectorTo,
    } = this.props;

    this.localisation = {
      locale,
      months,
      weekdaysLong,
      weekdaysShort,
      fromLabel,
      toLabel
    };
  }

  componentDidMount () {
    Highcharts.addEvent(this.props.getAxis(), 'afterSetExtremes', this.handleAfterSetExtremes);

    const { min, max } = this.props.getExtremes();
    this.setState({
      min,
      max
    });
  }

  handleFromDateChange (callback) {
    return fromDate => {
      let {max} = this.props.getExtremes();
      let selectedTime = fromDate.startOf('day').valueOf();

      let newMax = (selectedTime >= max) ? selectedTime + ONE_DAY : max;
      this.props.setExtremes(selectedTime, newMax);

      callback(selectedTime);
    };
  }

  handleToDateChange (callback) {
    return toDate => {
      let {min} = this.props.getExtremes();
      let selectedTime = toDate.startOf('day').valueOf();

      let newMin = (selectedTime <= min) ? selectedTime - ONE_DAY : min;
      this.props.setExtremes(newMin, selectedTime);

      callback(selectedTime);
    };
  }

  handleAfterSetExtremes (e) {
    const { min, max } = e;
    this.setState({
      min,
      max
    });
  }

  render () {
    const axis = this.props.getAxis();
    if (!axis) return null;

    const { fromLabel, toLabel, ...localisationOpts } = this.localisation;
    const {
      dayFormat,
      onChangeFromDate,
      onChangeToDate,
      className,
      datePickerClassNames,
      ...datePickerProps
    } = this.props;
    const { min, max } = this.state;

    const fromDate = moment(min).format(dayFormat);
    const toDate = moment(max).format(dayFormat);

    return (
      <div className={className}>
        <span className={`${className}__label ${className}__from-label`}>{fromLabel}: </span>
        <DayPicker.Input
          value={fromDate}
          onDayChange={this.handleFromDateChange(onChangeFromDate)}
          format={dayFormat}
          classNames={datePickerClassNames}
          {...datePickerProps}
          {...localisationOpts} />
        <span className={`${className}__label ${className}__to-label`}>{toLabel}: </span>
        <DayPicker.Input
          value={toDate}
          onDayChange={this.handleToDateChange(onChangeToDate)}
          format={dayFormat}
          classNames={datePickerClassNames}
          {...datePickerProps}
          {...localisationOpts} />
      </div>
    );
  }
}

export default provideAxis(DateRangePickers);
