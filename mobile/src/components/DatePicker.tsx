import {
  DatepickerProps,
  Datepicker as BasicDatePicker,
} from '@ui-kitten/components';
import React, { useState, useEffect } from 'react';

export const DatePicker: React.FC<Partial<DatepickerProps>> = (props) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    props.onSelect(date);
  }, [date]);

  return (
    <BasicDatePicker
      {...props}
      date={date}
      onSelect={(date) => {
        setDate(date);
        props.onSelect(date);
      }}
    />
  );
};
