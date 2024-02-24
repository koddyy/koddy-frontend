"use client";

import { Button } from "@/components/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-[180px] flex flex-col items-center gap-[16px]">
      <div className="subheading">오류가 발생했습니다.</div>
      <Button
        className="body-1-bold"
        variant="outline"
        size="sm"
        fullWidth={false}
        color="primary-dark"
        onClick={() => reset()}
      >
        다시 시도하기
      </Button>
    </div>
  );
}
