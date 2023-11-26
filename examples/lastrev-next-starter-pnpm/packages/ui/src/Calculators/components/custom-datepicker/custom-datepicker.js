import React, { useState } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

function handleDateChange(date, handleDate, setStartDate, formatYears) {
  setStartDate(date);
  handleDate(formatYears ? moment().diff(date, 'years') : date);
}

const CustomDatePicker = ({ handleDate, formatYears = false }) => {
  const [startDate, setStartDate] = useState('');
  return (
    <DatePicker
      selected={startDate}
      // maxDate={new Date()}
      showPopperArrow={false}
      // showMonthDropdown
      // showYearDropdown
      onChange={(date) => handleDateChange(date, handleDate, setStartDate, formatYears)}
    />
  );
};

export default CustomDatePicker;
