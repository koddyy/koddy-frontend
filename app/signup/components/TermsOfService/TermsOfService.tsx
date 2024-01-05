import { useState } from "react";
import { BottomButton } from "@/app/components/BottomButton";
import { Checkbox } from "@/components/Checkbox";
import { Divider } from "@/components/Divider/Divider";

const TOS_ITEMS = [
  { text: "개인정보 수집 및 이용", url: "https://www.google.com" },
  { text: "이용약관", url: "https://www.google.com" },
  { text: "개인정보의 제 3자 제공", url: "https://www.google.com" },
];

interface TermsOfServiceProps {
  onClickNextStep: () => void;
}

export const TermsOfService = ({ onClickNextStep }: TermsOfServiceProps) => {
  const [isChecked, setIsChecked] = useState(() => new Array<boolean>(3).fill(false));

  const handleChangeCheckedAll = () => {
    setIsChecked((prev) => prev.map((v) => !v));
  };

  const handleChangeChecked = (index: number) => {
    setIsChecked((prev) => {
      const cloned = [...prev];
      cloned[index] = !cloned[index];
      return cloned;
    });
  };

  const isCheckedAll = isChecked.every((v) => v === true);

  return (
    <>
      <div className="headline-1 mb-[27px] mt-[21px]">
        코띠 서비스 이용에
        <br />
        동의해주세요
      </div>
      <Checkbox
        className="body-2-bold"
        checked={isCheckedAll}
        onChangeChecked={handleChangeCheckedAll}
      >
        아래 항목에 전부 동의합니다.
      </Checkbox>
      <Divider className="my-4" />
      <div className="flex flex-col gap-4">
        {TOS_ITEMS.map(({ text, url }, i) => (
          <Checkbox key={i} checked={isChecked[i]} onChangeChecked={() => handleChangeChecked(i)}>
            <button
              className="body-2-bold font-bold text-primary-dark underline"
              type="button"
              onClick={() => window.open(url)}
            >
              {text}
            </button>
            에 동의합니다. (필수)
          </Checkbox>
        ))}
      </div>
      <BottomButton disabled={!isCheckedAll} onClick={onClickNextStep}>
        다음
      </BottomButton>
    </>
  );
};
