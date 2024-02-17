import "./Calendar.css";
import ReactCalendar, { CalendarProps } from "react-calendar";

const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ ...props }: CalendarProps) => {
  return (
    <ReactCalendar
      locale="ko"
      minDetail="month"
      calendarType="gregory"
      minDate={new Date()}
      formatDay={(_, date) => `${date.getDate()}`}
      formatMonthYear={(_, date) => `${date.getMonth() + 1}월`}
      formatShortWeekday={(_, date) => `${WeekDays[date.getDay()]}`}
      next2Label={null}
      prev2Label={null}
      {...props}
    />
  );
};
