import { useSearchParams } from "next/navigation";
import {
  isValidCoffeeChatCategory,
  isValidPassedCoffeChatStatus,
  isValidWaitingCoffeeChatStatus,
} from "@/types/coffeechat";

const DEFAULT_CATEGORY = "waiting";

export const useActiveCategoryAndStatus = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const status = searchParams.get("status") ?? "";

  const activeCategory = isValidCoffeeChatCategory(category) ? category : DEFAULT_CATEGORY;

  const activeStatus = (() => {
    if (activeCategory === "waiting" && isValidWaitingCoffeeChatStatus(status)) {
      return status;
    } else if (activeCategory === "passed" && isValidPassedCoffeChatStatus(status)) {
      return status;
    }
    return;
  })();

  return { activeCategory, activeStatus };
};
