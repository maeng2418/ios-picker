import React from "react";
import "./DatePicker.css";
import { CustomWheel } from "../../components";

const YEARS = new Array(201).fill(1900).map((value, index) => value + index);

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

const DatePicker = ({ date, onDateChange }) => {
  const days = new Array(
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  )
    .fill(1)
    .map((value, index) => value + index);

  const dateChanged = (type, changedData) => {
    let newDate;

    if (type === "day") {
      newDate = new Date(date.getFullYear(), date.getMonth(), changedData + 1);
    }
    if (type === "month") {
      let maxDayInSelectedMonth = new Date(
        date.getFullYear(),
        changedData + 1,
        0
      ).getDate();
      let day = Math.min(date.getDate(), maxDayInSelectedMonth);
      newDate = new Date(date.getFullYear(), changedData, day);
    }
    if (type === "year") {
      let maxDayInSelectedMonth = new Date(
        1900 + changedData,
        date.getMonth() + 1,
        0
      ).getDate();
      let day = Math.min(date.getDate(), maxDayInSelectedMonth);
      newDate = new Date(1900 + changedData, date.getMonth(), day);
    }
    onDateChange(newDate);
  };

  return (
    <div className={"date-picker"}>
      <CustomWheel
        type="day"
        data={days}
        selected={date.getDate()}
        onDateChange={dateChanged}
      />
      <CustomWheel
        type="month"
        data={MONTHS}
        selected={date.getMonth() + 1}
        onDateChange={dateChanged}
      />
      <CustomWheel
        type="year"
        data={YEARS}
        selected={date.getYear() + 1}
        onDateChange={dateChanged}
      />
    </div>
  );
};

export default DatePicker;
