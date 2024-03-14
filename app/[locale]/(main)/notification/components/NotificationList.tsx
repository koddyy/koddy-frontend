import { useTranslations } from "next-intl";
import { useGetNotificationList } from "@/apis/notification/hooks/useGetNotificationList";
import { useMarkAsReadNotification } from "@/apis/notification/hooks/useMarkAsReadNotification";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { PATH } from "@/constants/path";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { useIntersect } from "@/hooks/useIntersect";
import { Link } from "@/libs/navigation";
import { toYYYYMMDD, zonedToLocalDate } from "@/utils/dateUtils";
import { NotificationItem } from "./NotificationItem/NotificationItem";

export const NotificationList = () => {
  const t = useTranslations("notification");

  const { data: me } = useGetMe();
  const {
    data: notificationList,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useGetNotificationList({ page: 1 });
  const { mutate: markAsReadNotification } = useMarkAsReadNotification();

  const ref = useIntersect(() => {
    if (hasNextPage && !isFetching) fetchNextPage();
  });

  if (!me) return null;

  return (
    <>
      {notificationList.map(({ id, read, type, createdAt, member, coffeeChat }) => {
        const { cancelReason, rejectReason, reservedDay } = coffeeChat;

        return (
          <Link
            key={id}
            href={PATH.COFFEECHAT + `/${coffeeChat.id}`}
            onClick={() => markAsReadNotification(id)}
          >
            <NotificationItem
              profileImageUrl={member.profileImageUrl ?? DefaultProfileImageUrl[me.role]}
              description={
                <>
                  {t.rich(type, {
                    em: (chunk) => <span className="body-2-bold">{chunk}</span>,
                    name: member.name,
                    date:
                      reservedDay &&
                      new Intl.DateTimeFormat("kr", { dateStyle: "long" }).format(
                        zonedToLocalDate(reservedDay)
                      ),
                    cancelReason,
                    rejectReason,
                  })}
                </>
              }
              date={toYYYYMMDD(zonedToLocalDate(createdAt))}
              isRead={read}
            />
          </Link>
        );
      })}
      <div ref={ref} />
    </>
  );
};
