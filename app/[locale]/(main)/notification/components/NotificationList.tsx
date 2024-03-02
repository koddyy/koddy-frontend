import { useTranslations } from "next-intl";
import { useGetNotificationList } from "@/apis/notification/hooks/useGetNotificationList";
import { useMarkAsReadNotification } from "@/apis/notification/hooks/useMarkAsReadNotification";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { PATH } from "@/constants/path";
import { DefaultProfileImageUrl } from "@/constants/profile";
import { Link } from "@/libs/navigation";
import { KSTtoZonedDate, toYYYYMMDD } from "@/utils/dateUtils";
import { NotificationItem } from "./NotificationItem/NotificationItem";

export const NotificationList = () => {
  const t = useTranslations("notification");

  const { data: me } = useGetMe();
  const { data: notificationList } = useGetNotificationList({ page: 1 });
  const { mutate: markAsReadNotification } = useMarkAsReadNotification();

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
                        KSTtoZonedDate(reservedDay)
                      ),
                    cancelReason,
                    rejectReason,
                  })}
                </>
              }
              date={toYYYYMMDD(KSTtoZonedDate(createdAt))}
              isRead={read}
            />
          </Link>
        );
      })}
    </>
  );
};
