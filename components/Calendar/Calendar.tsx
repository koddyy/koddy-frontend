import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-teal/theme.css";
import {
  Calendar as DefaultCalendar,
  CalendarPropsSingle as DefaultCalendarProps,
} from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";

interface CalendarProps extends Omit<DefaultCalendarProps, "onChange" | "selectionMode"> {
  onChange: (value: Nullable<Date>) => void;
}

export const Calendar = ({ onChange, ...props }: CalendarProps) => {
  return (
    <DefaultCalendar
      className="w-full"
      selectionMode="single"
      minDate={new Date()}
      inline
      showWeek
      onChange={(e) => onChange(e.value)}
      {...props}
    />
  );
};
