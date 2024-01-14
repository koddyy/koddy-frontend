import { useState } from "react";
import { toYYYYMMDD } from "@/utils/dateUtils";
import { Button } from "../Button";
import { Wheel } from "./Wheel";

/**
 * @TODO 데이터 변경 필요
 */

const YEAR = [2024, 2025];
const MONTH = new Array(12).fill(0).map((_, i) => i + 1);
const DAY = new Array(30).fill(0).map((_, i) => i + 1);

type DateType = {
  year: number;
  month: number;
  day: number;
};
export interface DatePickerProps {
  defaultDate?: Date;
  onChangeDate?: (date: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DatePicker = ({ defaultDate = new Date(), onChangeDate }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState({
    year: defaultDate.getFullYear(),
    month: defaultDate.getMonth(),
    day: defaultDate.getDay(),
  });

  const handleChangeItem = (dateType: keyof DateType, item: number) => {
    setSelectedDate((prev) => ({ ...prev, [dateType]: item }));
  };

  const handleChangeDate = () => {
    const YYYYMMDD = toYYYYMMDD(new Date(selectedDate.year, selectedDate.month, selectedDate.day));
    onChangeDate?.(YYYYMMDD);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-overlay rounded-t-xl bg-white py-5 text-2xl">
      <div className="flex h-60 w-full px-5">
        <Wheel //
          items={YEAR}
          onChangeItemIndex={(index) => handleChangeItem("year", YEAR[index])}
        />
        <Wheel
          items={MONTH}
          onChangeItemIndex={(index) => handleChangeItem("month", MONTH[index])}
        />
        <Wheel //
          items={DAY}
          onChangeItemIndex={(index) => handleChangeItem("day", DAY[index])}
        />
      </div>
      <div className="px-5 pb-4 pt-6">
        <Button onClick={handleChangeDate}>선택</Button>
      </div>
    </div>
  );
};
