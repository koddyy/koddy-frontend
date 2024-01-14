import { useMemo, useState } from "react";
import { getDaysInMonth, toYYYYMMDD } from "@/utils/dateUtils";
import { range } from "@/utils/number";
import { Button } from "../Button";
import { Wheel } from "./Wheel";

type DateType = {
  year: number;
  month: number;
  day: number;
};

export interface DatePickerProps {
  defaultDate?: Date;
  onChangeDate?: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker = ({
  defaultDate = new Date(),
  onChangeDate,
  minDate = new Date(),
  maxDate = new Date(new Date().getFullYear() + 1, new Date().getMonth(), new Date().getDate()),
}: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState({
    year: defaultDate.getFullYear(),
    month: defaultDate.getMonth() + 1,
    day: defaultDate.getDay(),
  });

  const handleChangeItem = (dateType: keyof DateType, item: number) => {
    setSelectedDate((prev) => ({ ...prev, [dateType]: item }));
  };

  const handleChangeDate = () => {
    const YYYYMMDD = toYYYYMMDD(new Date(selectedDate.year, selectedDate.month, selectedDate.day));
    onChangeDate?.(YYYYMMDD);
  };

  const min = {
    year: minDate.getFullYear(),
    month: minDate.getMonth() + 1,
    day: minDate.getDate(),
  };

  const max = {
    year: maxDate.getFullYear(),
    month: maxDate.getMonth() + 1,
    day: maxDate.getDate(),
  };

  const YEAR = useMemo(() => range(min.year, max.year), [min.year, max.year]);

  const MONTH = useMemo(() => {
    if (min.year === max.year) {
      return range(min.month, max.month);
    } else if (minDate.getFullYear() === selectedDate.year) {
      return range(min.month, 12);
    } else if (maxDate.getFullYear() === selectedDate.year) {
      return range(1, max.month);
    }
    return range(1, 12);
  }, [max.month, max.year, maxDate, min.month, min.year, minDate, selectedDate.year]);

  const DAY = useMemo(() => {
    if (min.year === max.year && min.month === max.month) {
      return range(min.day, max.day);
    } else if (min.year === selectedDate.year && min.month === selectedDate.month) {
      return range(min.day, getDaysInMonth(selectedDate.year, selectedDate.month));
    } else if (max.year === selectedDate.year && max.month === selectedDate.month) {
      return range(1, max.day);
    }
    return range(1, getDaysInMonth(selectedDate.year, selectedDate.month));
  }, [
    min.year,
    min.month,
    min.day,
    max.year,
    max.month,
    max.day,
    selectedDate.year,
    selectedDate.month,
  ]);

  return (
    <div className="absolute inset-x-0 bottom-0 z-overlay rounded-t-xl bg-white py-5 text-2xl">
      <div className="flex h-60 w-full px-5">
        <Wheel //
          items={YEAR}
          onChangeItemIndex={(index) => handleChangeItem("year", YEAR[index])}
          initialIndex={selectedDate.year - min.year}
        />
        <Wheel
          items={MONTH}
          onChangeItemIndex={(index) => handleChangeItem("month", MONTH[index])}
          initialIndex={selectedDate.month - 1}
        />
        <Wheel //
          items={DAY}
          onChangeItemIndex={(index) => handleChangeItem("day", DAY[index])}
          initialIndex={selectedDate.day - 1}
        />
      </div>
      <div className="px-5 pb-4 pt-6">
        <Button onClick={handleChangeDate}>선택</Button>
      </div>
    </div>
  );
};
