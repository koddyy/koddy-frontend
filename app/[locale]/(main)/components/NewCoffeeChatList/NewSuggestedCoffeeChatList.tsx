import Link from "next/link";
import { useTranslations } from "next-intl";
import { useGetNewSuggestedCoffeeChatList } from "@/apis/coffeechat/hooks/useGetNewSuggestedCoffeeChatList";
import ArrowRight from "@/assets/arrow_right.svg";
import { Carousel } from "@/components/Carousel";
import { Divider } from "@/components/Divider";
import { PATH } from "@/constants/path";
import { cn } from "@/utils/cn";
import { UserCard } from "../UserCard";

export const NewSuggestedCoffeeChatList = () => {
  const t = useTranslations("home.NewCoffeeChatList");

  const { data: newCoffeeChatList } = useGetNewSuggestedCoffeeChatList();

  if (newCoffeeChatList.result.length === 0) return;

  return (
    <>
      <div className="mb-3 flex justify-between">
        <div className="subheading-bold">
          {t.rich("title.suggested", {
            count: newCoffeeChatList.totalCount,
            mark: (chunk) => <span className="text-primary">{chunk}</span>,
          })}
        </div>
        <Link
          href={PATH.COFFEECHAT + "?category=suggested&status=SUGGEST"}
          className="body-3 flex items-center text-gray-600"
        >
          {t("view")}
          <ArrowRight width={20} height={20} />
        </Link>
      </div>
      <div className="mb-4">
        <Carousel loop={false} slides={{ perView: "auto", spacing: 20 }}>
          {newCoffeeChatList.result
            .map(({ coffeeChatId, ...user }) => {
              return (
                <Link
                  href={`/coffeechat/${coffeeChatId}`}
                  key={coffeeChatId}
                  className={cn(
                    "min-w-[70%] max-w-[70%]",
                    newCoffeeChatList.result.length === 1 && "min-max-full min-w-full"
                  )}
                >
                  <UserCard role="mentor" {...user} />
                </Link>
              );
            })
            .concat(
              newCoffeeChatList.totalCount > 3 ? (
                <Link
                  key="more"
                  className={cn(
                    "flex min-w-[70%] max-w-[70%] items-center justify-center rounded-xl bg-gray-100"
                  )}
                  href={PATH.COFFEECHAT + "?category=suggested&status=SUGGEST"}
                >
                  <div className="subheading-bold flex items-center gap-[4px]">
                    <span>{t("more")}</span>
                    <ArrowRight width={24} height={24} />
                  </div>
                </Link>
              ) : (
                []
              )
            )}
        </Carousel>
      </div>
      <Divider className="border-[4px]" />
    </>
  );
};
