"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";
import { useQueryString } from "@/hooks/useQueryString";
import { Link } from "@/libs/navigation";

export const SwitchExploreUserButton = () => {
  const t = useTranslations("home");

  const { searchParams, createQueryString } = useQueryString();

  const currentExploreRole = searchParams.get("explore") === "mentor" ? "mentor" : "mentee";

  const switchExploreRole = currentExploreRole === "mentor" ? "mentee" : "mentor";

  return (
    <Link href={createQueryString({ explore: switchExploreRole })}>
      <Button size="xs" className="body-2-bold h-[35px]" fullWidth={false}>
        {t(`explore-${switchExploreRole}`)}
      </Button>
    </Link>
  );
};
