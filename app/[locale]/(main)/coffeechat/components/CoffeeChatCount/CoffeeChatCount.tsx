import { Fragment } from "react";
import { useGetCoffeeChatCount } from "@/apis/coffeechat/hooks/useGetCoffeeChatCounts";
import ArrowRight from "@/assets/arrow_right.svg";
import { Button } from "@/components/Button";
import { CoffeeChatCategoryOptions } from "@/constants/coffeechat";
import { PATH } from "@/constants/path";
import { Link } from "@/libs/navigation";
import { CoffeeChatCategoryList } from "@/types/coffeechat";
import { Role } from "@/types/user";

const SuggestCategoryLabel = {
  mentor: "제안한 커피챗",
  mentee: "커피챗 제안",
} as const;

interface CoffeeChatCountProps {
  role: Role;
}

export const CoffeeChatCount = ({ role }: CoffeeChatCountProps) => {
  const { data: count } = useGetCoffeeChatCount();

  return (
    <div className="flex flex-col gap-[16px]">
      <Link href={PATH.COFFEECHAT_SUGGEST}>
        <Button
          variant="outline"
          color="grayscale"
          className="body-3 flex items-center justify-between border border-gray-300 text-gray-500"
        >
          {SuggestCategoryLabel[role]}
          <div className="flex items-center gap-[2px]">
            <span className="headline-2">{count?.suggest ?? 0}</span>
            <ArrowRight width={24} height={24} />
          </div>
        </Button>
      </Link>
      <div className="flex items-center justify-between rounded-[10px] bg-gray-100 px-[28px] py-[13px] text-gray-500">
        {CoffeeChatCategoryList.map(
          (category, i) =>
            category !== "suggest" && (
              <Fragment key={category}>
                <div className="text-center">
                  <div className="headline-2">{count?.[category] ?? 0}</div>
                  <div className="label">{CoffeeChatCategoryOptions[category] ?? 0}</div>
                </div>
                {i !== CoffeeChatCategoryList.length - 1 && (
                  <ArrowRight width={18} height={18} className="text-gray-500" />
                )}
              </Fragment>
            )
        )}
      </div>
    </div>
  );
};
