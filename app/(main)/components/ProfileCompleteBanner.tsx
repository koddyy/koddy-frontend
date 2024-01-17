import { useGetMe } from "@/apis/user/hooks/useGetMe";
import { Banner } from "@/components/Banner";
import { Progress } from "@/components/Progress";
import { PATH } from "@/constants/path";

export const ProfileCompleteBanner = () => {
  const { data: me } = useGetMe();

  if (me?.role === "mentor") {
    const percent = Math.floor(
      ((Number(!!me.introduction) + Number(!!me.period) + Number(me.schedules?.length)) / 3) * 100
    );

    return (
      <Banner href={PATH.NEWCOMER} actionText="입력하러 가기">
        <Progress percent={percent} color="secondary" tickness="thin" />
        <div className="mb-[10px] mt-[8px] flex flex-col gap-[4px]">
          <span className="subheading-bold">
            멘토 프로필
            <mark className="bg-transparent text-secondary-light"> {percent}% </mark>
            완성
          </span>
          <span className="label">커피챗 성사를 위해 {me?.name}님의 소개를 입력해 주세요!</span>
        </div>
      </Banner>
    );
  }

  if (me?.role === "mentee") {
    return (
      <Banner href={PATH.NEWCOMER} actionText="입력하러 가기">
        {me?.role === "mentee" && (
          <div className="mb-[10px] flex flex-col gap-[4px]">
            <span className="subheading-bold">멘티님의 소개가 궁금해요.</span>
            <span className="label">커피챗 성사를 위해 {me?.name}님의 소개를 입력해 주세요!</span>
          </div>
        )}
      </Banner>
    );
  }

  return null;
};
