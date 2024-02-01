import { useMemo, useRef, useState } from "react";
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
    day: defaultDate.getDate(),
  });

  const handleChangeItem = (dateType: keyof DateType, item: number) => {
    if (dateType === "day") {
      setSelectedDate((prev) => ({ ...prev, [dateType]: item }));
    } else {
      setSelectedDate((prev) => {
        const copy = { ...prev, [dateType]: item };
        const day = Math.min(getDaysInMonth(copy.year, copy.month), copy.day);
        return { ...copy, day };
      });
    }
  };

  const handleChangeDate = () => {
    const YYYYMMDD = toYYYYMMDD(
      new Date(selectedDate.year, selectedDate.month - 1, selectedDate.day)
    );
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
    return range(1, getDaysInMonth(selectedDate.year, selectedDate.month));
  }, [selectedDate.year, selectedDate.month]);

  const initialIndex = useRef({
    year: YEAR.indexOf(selectedDate.year),
    month: MONTH.indexOf(selectedDate.month),
    day: DAY.indexOf(selectedDate.day),
  });

  return (
    <div className="fixed bottom-0 left-1/2 z-overlay w-full max-w-screen-sm -translate-x-1/2 rounded-t-xl bg-white py-5 text-2xl">
      <div className="flex h-60 w-full px-5">
        <Wheel //
          items={YEAR}
          onChangeItemIndex={(index) => handleChangeItem("year", YEAR[index])}
          initialIndex={initialIndex.current.year}
        />
        <Wheel
          items={MONTH}
          onChangeItemIndex={(index) => handleChangeItem("month", MONTH[index])}
          initialIndex={initialIndex.current.month}
        />
        <Wheel //
          items={DAY}
          onChangeItemIndex={(index) => handleChangeItem("day", DAY[index])}
          initialIndex={initialIndex.current.day}
        />
      </div>
      <div className="px-5 pb-4 pt-6">
        <Button onClick={handleChangeDate}>선택</Button>
      </div>
    </div>
  );
};
