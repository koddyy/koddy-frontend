"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const constants = useTranslations("constants.error");

  return (
    <div className="mt-[180px] flex flex-col items-center gap-[16px]">
      <div className="subheading">{constants("description")}</div>
      <Button
        className="body-1-bold"
        variant="outline"
        size="sm"
        fullWidth={false}
        color="primary-dark"
        onClick={() => reset()}
      >
        {constants("retry")}
      </Button>
    </div>
  );
}
