import { useTranslations } from "use-intl";
import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { Banner } from "@/components/Banner";
import { Progress } from "@/components/Progress";
import { PATH } from "@/constants/path";

export const ProfileCompleteBanner = () => {
  const t = useTranslations("home.ProfileCompleteBanner");

  const { data: me } = useGetMe();

  if (me?.role === "mentor") {
    const percent = Math.floor(
      ((Number(!!me.introduction) + Number(!!me.period) + Number(!!me.schedules?.length)) / 3) * 100
    );

    return (
      <Banner href={PATH.NEWCOMER + "/mentor"} actionText={t(`${me.role}.complete-profile`)}>
        <Progress percent={percent} color="secondary" tickness="thin" />
        <div className="mb-[10px] mt-[8px] flex flex-col gap-[4px]">
          <span className="subheading-bold">
            {t.rich(`${me.role}.title`, {
              percent,
              mark: (chunk) => <mark className="bg-transparent text-secondary-light">{chunk}</mark>,
            })}
          </span>
          <span className="label">{t(`${me.role}.description`, { name: me.name })}</span>
        </div>
      </Banner>
    );
  }

  if (me?.role === "mentee") {
    return (
      <Banner href={PATH.NEWCOMER + "/mentee"} actionText={t(`${me.role}.complete-profile`)}>
        {me?.role === "mentee" && (
          <div className="mb-[10px] flex flex-col gap-[4px]">
            <span className="subheading-bold">{t(`${me.role}.title`)}</span>
            <span className="label">{t(`${me.role}.description`, { name: me.name })}</span>
          </div>
        )}
      </Banner>
    );
  }

  return null;
};
