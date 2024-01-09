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
    <div className="flex h-full w-full">
      <Wheel items={YEAR} />
      <Wheel items={MONTH} />
      <Wheel items={DAY} />
    </div>
  );
};
