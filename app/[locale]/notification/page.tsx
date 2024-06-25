"use client";

import { GoToLogin } from "@/app/components/GoToLogin";
import { NavigationBar } from "@/app/components/NavigationBar";
import { SSRSafeSuspense } from "@/app/components/SSRSafeSuspense";
import { NotificationList } from "@/features/notification/ui/NotificationList";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/libs/navigation";

const Page = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    <>
      <NavigationBar title="알림" onClickGoback={() => router.back()} />
      {isAuthenticated ? (
        <SSRSafeSuspense>
          <NotificationList />
        </SSRSafeSuspense>
      ) : (
        <div className="mt-[195px]">
          <GoToLogin />
        </div>
      )}
    </>
  );
};

export default Page;
