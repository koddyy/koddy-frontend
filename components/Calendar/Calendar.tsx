import "./Calendar.css";
import { useLocale } from "next-intl";
import ReactCalendar, { CalendarProps } from "react-calendar";

const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const Calendar = ({ ...props }: CalendarProps) => {
  const locale = useLocale();

  return (
    <ReactCalendar
      locale={locale}
      minDetail="month"
      calendarType="gregory"
      minDate={new Date()}
      formatDay={(_, date) => `${date.getDate()}`}
      navigationLabel={({ date, locale }) =>
        new Intl.DateTimeFormat(locale, { month: "long" }).format(date)
      }
      formatShortWeekday={(_, date) => `${WeekDays[date.getDay()]}`}
      next2Label={null}
      prev2Label={null}
      {...props}
    />
  );
};
