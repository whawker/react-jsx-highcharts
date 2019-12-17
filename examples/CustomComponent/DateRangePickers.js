import React, { useState, useEffect } from 'react';
import { useHighcharts, useAxis } from 'react-jsx-highcharts';
import DayPicker from 'react-day-picker';
import { parse as dateParse, format as dateFormat, startOfDay } from 'date-fns'

const DAY_FORMAT = 'DD MMM YYYY';
const ONE_DAY = 86400000;

const parseDate = str => dateParse(str, DAY_FORMAT);
const formatDate = date => dateFormat(date, DAY_FORMAT);

const DateRangePickers = () => {
  const Highcharts = useHighcharts();
  const axis = useAxis('xAxis');

  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const handleFromDateChange = fromDate => {
    const newMin = startOfDay(fromDate).valueOf();
    const newMax = (newMin >= to) ? newMin + ONE_DAY : to.valueOf();

    axis.setExtremes(newMin, newMax);
  };

  const handleToDateChange = toDate => {
    const newMax = startOfDay(toDate).valueOf();
    const newMin = (newMax <= from) ? newMax - ONE_DAY : from.valueOf();

    axis.setExtremes(newMin, newMax);
  };

  const handleAfterSetExtremes = ({ min, max }) => {
    setFrom(new Date(min));
    setTo(new Date(max));
  };

  useEffect(() => {
    if (!axis) return;

    Highcharts.addEvent(axis.object, 'afterSetExtremes', handleAfterSetExtremes);
    const { min, max } = axis.getExtremes();
    setFrom(new Date(min));
    setTo(new Date(max));

    return () => {
      Highcharts.removeEvent(axis.object, 'afterSetExtremes', handleAfterSetExtremes);
    }
  }, [axis]);

  if (from === null || to === null) {
    return null;
  }

  return (
    <div className="date-range-pickers">
      <span className="date-range-pickers__from-label">From: </span>
      <DayPicker.Input
        value={from}
        format={DAY_FORMAT}
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{ month: from }}
        onDayChange={handleFromDateChange} />
      <span className="date-range-pickers__to-label">To: </span>
      <DayPicker.Input
        value={to}
        format={DAY_FORMAT}
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{ month: to }}
        onDayChange={handleToDateChange} />
    </div>
  )
};

export default DateRangePickers;
