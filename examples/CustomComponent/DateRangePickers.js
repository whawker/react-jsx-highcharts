import React, { Component } from 'react';
import moment from 'moment';
import DayPicker from 'react-day-picker';
import Highcharts from 'highstock-release';
import { provideAxis } from 'react-jsx-highcharts';
import './DateRangePickers.css';

const DAY_FORMAT = 'DD MMM YYYY';

class DateRangePickers extends Component {

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

  componentDidMount () {
    Highcharts.addEvent(this.props.getAxis(), 'afterSetExtremes', this.handleAfterSetExtremes);

    const { min, max } = this.props.getExtremes();
    this.setState({
      min,
      max
    });
  }

  handleFromDateChange (fromDate) {
    let { max } = this.props.getExtremes();
    let selectedTime = fromDate.startOf('day').valueOf();

    let newMax = (selectedTime >= max) ? selectedTime + 86400000 : max;
    this.props.setExtremes(selectedTime, newMax);
  }

  handleToDateChange (toDate) {
    let { min } = this.props.getExtremes();
    let selectedTime = toDate.startOf('day').valueOf();

    let newMin = (selectedTime <= min) ? selectedTime - 86400000 : min;
    this.props.setExtremes(newMin, selectedTime);
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
    const { min, max } = this.state;

    const fromDate = moment(min).format(DAY_FORMAT);
    const toDate = moment(max).format(DAY_FORMAT);

    return (
      <div className="date-range-pickers">
        <span className="date-range-pickers__from-label">From: </span>
        <DayPicker.Input
          value={fromDate}
          onDayChange={this.handleFromDateChange}
          format={DAY_FORMAT} />
        <span className="date-range-pickers__to-label">To: </span>
        <DayPicker.Input
          value={toDate}
          onDayChange={this.handleToDateChange}
          format={DAY_FORMAT} />
      </div>
    );
  }
}

// The important bit, using the provideAxis HOC to inject Highcharts axis methods
export default provideAxis(DateRangePickers);
