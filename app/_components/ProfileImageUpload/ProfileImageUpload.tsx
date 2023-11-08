export const ProfileImageUpload = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <div>
        <img src="/images/profile.png" />
      </div>
      <button type="button" className="label-bold rounded-[0.625rem] border border-gray-300 p-2">
        프로필 등록하기
      </button>
    </div>
  );
};
