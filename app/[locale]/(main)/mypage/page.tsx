"use client";

import Link from "next/link";
import { NavigationBar } from "@/app/components/NavigationBar";
import { ProfileImageUpload } from "@/app/components/ProfileImageUpload";
import ThreeDots from "@/assets/three_dots.svg";
import { Button } from "@/components/Button";
import { Divider } from "@/components/Divider/Divider";
import { PATH } from "@/constants/path";
import { useAuth } from "@/hooks/useAuth";

const linkStyle = "inline-block w-full px-[20px] py-[14px]";

const Page = ({
  searchParams,
}: {
  searchParams: {
    explore?: string;
  };
}) => {
  const explore = searchParams.explore ?? "mentee";
  const { isLoading, isAuthenticated, me } = useAuth();

  if (isLoading) return null;

  const description =
    me?.role === "mentor"
      ? `${me.school} ${me.major} ${me.enteredIn}학번`
      : `관심 : ${me?.interestSchool}, ${me?.interestMajor}`;

  return (
    <>
      <NavigationBar
        title="마이페이지"
        rightContent={
          isAuthenticated && (
            <Link href={PATH.MYPAGE_ACCOUNT}>
              <ThreeDots />
            </Link>
          )
        }
      />
      <div className="flex flex-col items-center gap-3 px-11 pb-5 pt-[1.38rem]">
        <ProfileImageUpload
          imageUrl={isAuthenticated ? me.profileImageUrl : ""}
          role={isAuthenticated ? me.role : explore === "mentor" ? "mentee" : "mentor"}
        />
        {isAuthenticated ? (
          <div className="flex flex-col items-center gap-1">
            <span className="headline-2">{me.name}</span>
            <p className="text-gray-600">{description}</p>
          </div>
        ) : (
          <Link href={PATH.LOGIN}>
            <Button
              variant="outline"
              size="sm"
              className="body-1-bold h-[44px] w-[237px] text-gray-600"
            >
              로그인/회원가입 하기
            </Button>
          </Link>
        )}
      </div>
      <Divider className="border-4 border-gray-100" />
      {isAuthenticated ? (
        <>
          <div>
            <Link href={PATH.MYPAGE_EDIT} className={linkStyle}>
              회원 정보 수정
            </Link>
            <Divider className="border-gray-100" />
            {me?.role === "mentor" && (
              <Link href={PATH.MYPAGE_EDIT + "/schedule"} className={linkStyle}>
                커피챗 기간 수정
              </Link>
            )}
          </div>
          <Divider className="border-4 border-gray-100" />
          <div>
            <Link href={PATH.MYPAGE_EDIT + "/language-and-timezone"} className={linkStyle}>
              언어 & 타임존 설정
            </Link>
            <Divider className="border-gray-100" />
            <div className="px-5 py-[0.88rem]">문의하기</div>
            <Divider className="border-gray-100" />
          </div>
        </>
      ) : (
        <>
          <div className={linkStyle}>문의하기</div>
          <Divider />
          <div className={linkStyle}>개인정보 처리방침</div>
        </>
      )}
    </>
  );
};

export default Page;
