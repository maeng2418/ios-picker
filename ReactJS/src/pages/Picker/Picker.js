import React, { useState } from "react";
import "./Picker.css";
import { DatePicker } from "../../components";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const Picker = () => {
  const [date, setDate] = useState(new Date());

  const resetDate = () => {
    setDate(new Date());
  };

  const dateChanged = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <div className={"date"}>
        {date.getDate()} {MONTHS[date.getMonth()]} {date.getFullYear()}
      </div>
      <DatePicker date={date} onDateChange={dateChanged} />
      <button className={"reset"} onClick={resetDate}>
        Reset Date
      </button>
    </>
  );
};

export default Picker;
