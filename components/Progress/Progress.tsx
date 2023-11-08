interface ProgressProps {
  percent: number;
}

export const Progress = ({ percent }: ProgressProps) => {
  return (
    <div className="relative h-[0.375rem] rounded bg-gray-200">
      <div
        className={"absolute h-[0.375rem] rounded bg-primary"}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};
