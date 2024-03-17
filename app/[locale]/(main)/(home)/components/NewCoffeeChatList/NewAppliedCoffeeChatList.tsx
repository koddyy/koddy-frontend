import { useTranslations } from "next-intl";
import { useGetNewAppliedCoffeeChatList } from "@/apis/coffeechat/hooks/useGetNewAppliedCoffeeChatList";
import ArrowRight from "@/assets/arrow_right.svg";
import { Carousel } from "@/components/Carousel";
import { Divider } from "@/components/Divider";
import { UserCard } from "@/components/UserCard";
import { PATH } from "@/constants/path";
import { Link } from "@/libs/navigation";
import { cn } from "@/utils/cn";

export const NewAppliedCoffeeChatList = () => {
  const t = useTranslations("home.NewCoffeeChatList");

  const { data: newCoffeeChatList } = useGetNewAppliedCoffeeChatList();

  if (newCoffeeChatList.result.length === 0) return;

  return (
    <>
      <div className="mb-3 flex justify-between px-[20px]">
        <div className="subheading-bold">
          {t.rich("title.applied", {
            count: newCoffeeChatList.totalCount,
            mark: (chunk) => <span className="text-primary">{chunk}</span>,
          })}
        </div>
        <Link
          href={PATH.COFFEECHAT + "?category=applied&status=APPLY"}
          className="body-3 flex items-center text-gray-600"
        >
          {t("view")}
          <ArrowRight width={20} height={20} />
        </Link>
      </div>
      <div className="mb-4">
        <Carousel loop={false} slides={{ perView: "auto" }}>
          {newCoffeeChatList.result
            .map(({ coffeeChatId, ...user }) => {
              return (
                <Link
                  href={`/coffeechat/${coffeeChatId}`}
                  key={coffeeChatId}
                  className={cn(
                    newCoffeeChatList.totalCount > 1 && "min-w-[70%] max-w-[70%] pl-[20px]",
                    newCoffeeChatList.totalCount === 1 && "min-max-full min-w-full px-[20px]"
                  )}
                >
                  <UserCard role="mentee" {...user} />
                </Link>
              );
            })
            .concat(
              newCoffeeChatList.totalCount > 3 ? (
                <Link
                  key="more"
                  className="min-w-[70%] max-w-[70%] px-[20px]"
                  href={PATH.COFFEECHAT + "?category=applied&status=APPLY"}
                >
                  <div className="subheading-bold flex h-full items-center justify-center gap-[4px] rounded-xl bg-gray-100">
                    <span> {t("more")}</span>
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
