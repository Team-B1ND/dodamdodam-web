import { ReactNode } from "react";
import { FcSurvey } from "@react-icons/all-files/fc/FcSurvey";
import { APPLY_ITEMS } from "../../../constants/apply/apply.constant";
import useApply from "../../../hooks/apply/useApply";
import ApplyBus from "./applyBus/applyBus";
import ApplyLeave from "./applyLeave/applyLeave";
import ApplyPass from "./applyPass/applyPass";
import ApplyStudyRoom from "./applyStudyrRoom/applyStudyRoom";
import * as S from "./style";

const Apply = () => {
  const { section, setSection } = useApply();

  const applyItemComponents: ReactNode[] = [
    <ApplyStudyRoom key="applyStudyRoom" />,
    <ApplyPass key="applyPass" />,
    <ApplyLeave key="applyLeave" />,
    <ApplyBus key="applyBus" />,
  ];

  return (
    <S.ApplyContainer>
      <S.ApplyTitleWrap>
        <S.ApplyTitleIcon>
          <FcSurvey />
        </S.ApplyTitleIcon>
        <S.ApplyTitleText>신청</S.ApplyTitleText>
        <S.ApplyTitleItemWrap>
          {APPLY_ITEMS.map((item) => (
            <S.ApplyTitleItem
              isSelect={section === item}
              onClick={() => setSection(item)}
              key={`applyTitleItem ${item}`}
            >
              <span>{item}</span>
            </S.ApplyTitleItem>
          ))}
        </S.ApplyTitleItemWrap>
      </S.ApplyTitleWrap>
      <S.ApplyFormWrap>
        {applyItemComponents.map((component, idx) => {
          return section === APPLY_ITEMS[idx] && component;
        })}
      </S.ApplyFormWrap>
    </S.ApplyContainer>
  );
};

export default Apply;
