import { Divider } from "@/components/Divider";
import { cn } from "@/utils/cn";

interface NotificationItemProps {
  profileImageUrl: string;
  description: React.ReactNode;
  date: string;
  isRead: boolean;
}

export const NotificationItem = ({
  profileImageUrl,
  description,
  date,
  isRead,
}: NotificationItemProps) => {
  return (
    <>
      <div
        className={cn(
          "flex items-center gap-[10px] px-[20px] py-[16px]",
          !isRead && "bg-[#E7F8EF]"
        )}
      >
        <img
          className="h-[42px] w-[42px] shrink-0 rounded-full border border-gray-300 bg-gray-100"
          src={profileImageUrl}
        />
        <div className="body-2">
          <>{description}</>
          <div className="body-3 text-gray-500">{date}</div>
        </div>
      </div>
      <Divider className="border-gray-200" />
    </>
  );
};
