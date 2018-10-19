import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { provideAxis } from 'react-jsx-highstock';
import 'react-day-picker/lib/style.css';
const ONE_DAY = 86400000;

class DateRangePickers extends Component {

  static propTypes = {
    getHighcharts: PropTypes.func.isRequired,
    axisId: PropTypes.string.isRequired,
    dayFormat: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]).isRequired,
    locale: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]).isRequired,
    onChangeFromDate: PropTypes.func.isRequired,
    onChangeToDate: PropTypes.func.isRequired,
    className: PropTypes.string.isRequired,
    fromLabel: PropTypes.string,
    toLabel: PropTypes.string,
    datePickerProps: PropTypes.object
  };

  static defaultProps = {
    dayFormat: 'DD MMM YYYY',
    locale: 'en',
    onChangeFromDate: () => {},
    onChangeToDate: () => {},
    className: 'date-range-pickers',
    datePickerProps: {}
  };

  state = {
    min: null,
    max: null
  };

  constructor (props) {
    super(props);

    const langOpts = props.getHighcharts().getOptions().lang;
    const { months: monthsLong, weekdays, shortWeekdays, rangeSelectorFrom, rangeSelectorTo } = langOpts;

    const {
      locale,
      months = monthsLong,
      weekdaysLong = weekdays,
      weekdaysShort = shortWeekdays,
      fromLabel = rangeSelectorFrom,
      toLabel = rangeSelectorTo,
    } = props;

    this.localisation = {
      locale,
      months,
      weekdaysLong,
      weekdaysShort,
      fromLabel,
      toLabel
    };
    //For input field value
    moment.locale(locale, {
      ...langOpts
    });
  }

  componentDidMount () {
    const { getHighcharts, getAxis } = this.props;
    const Highcharts = getHighcharts(); // Get Highcharts injected via withHighcharts
    const axis = getAxis();

    Highcharts.addEvent(axis.object, 'afterSetExtremes', this.handleAfterSetExtremes);

    const { min, max } = axis.getExtremes();
    this.setState({
      min,
      max
    });
  }

  componentWillUnmount () {
    const { getHighcharts, getAxis } = this.props;
    const Highcharts = getHighcharts(); // Get Highcharts injected via withHighcharts
    const axis = getAxis();
    if (axis.object) {
      Highcharts.removeEvent(axis.object, 'afterSetExtremes', this.handleAfterSetExtremes);
    }
  }

  handleFromDateChange = callback => {
    return fromDate => {
      const axis = this.props.getAxis();
      let { max } = axis.getExtremes();
      let selectedTime = fromDate.startOf('day').valueOf();

      let newMax = (selectedTime >= max) ? selectedTime + ONE_DAY : max;
      axis.setExtremes(selectedTime, newMax);

      callback(selectedTime);
    };
  }

  handleToDateChange = callback => {
    return toDate => {
      const axis = this.props.getAxis();
      let { min } = axis.getExtremes();
      let selectedTime = toDate.startOf('day').valueOf();

      let newMin = (selectedTime <= min) ? selectedTime - ONE_DAY : min;
      axis.setExtremes(newMin, selectedTime);

      callback(selectedTime);
    };
  }

  handleAfterSetExtremes = e => {
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
      datePickerProps
    } = this.props;
    const { min, max } = this.state;

    const fromDate = moment(min).format(dayFormat);
    const toDate = moment(max).format(dayFormat);

    return (
      <div className={className}>
        <span className={`${className}__label ${className}__from-label`}>{fromLabel}: </span>
        <DayPickerInput
          value={fromDate}
          onDayChange={this.handleFromDateChange(onChangeFromDate)}
          format={dayFormat}
          dayPickerProps={{ ...datePickerProps, ...localisationOpts }}
        />
        <span className={`${className}__label ${className}__to-label`}>{toLabel}: </span>
        <DayPickerInput
          value={toDate}
          onDayChange={this.handleToDateChange(onChangeToDate)}
          format={dayFormat}
          dayPickerProps={{ ...datePickerProps, ...localisationOpts }}
        />
      </div>
    );
  }
}

export default provideAxis(DateRangePickers);
