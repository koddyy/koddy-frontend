import { Wheel } from "./Wheel";

/**
 * @TODO 데이터 변경 필요
 */

const YEAR = [2024, 2025];
const MONTH = new Array(12).fill(0).map((_, i) => i + 1);
const DAY = new Array(30).fill(0).map((_, i) => i + 1);

export interface DatePickerProps {
  onChangeDate?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const DatePicker = ({ onChangeDate }: DatePickerProps) => {
  return (
    <div className="absolute inset-x-0 bottom-0 z-overlay rounded-t-xl bg-white py-5">
      <div className="flex h-60 w-full">
        <Wheel items={YEAR} />
        <Wheel items={MONTH} />
        <Wheel items={DAY} />
      </div>
    </div>
  );
};
