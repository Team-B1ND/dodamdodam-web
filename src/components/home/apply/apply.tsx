import { ReactNode } from "react";
import { FcSurvey } from "react-icons/fc";
import { APPLY_ITEMS } from "../../../constants/apply/apply.constant";
import useApply from "../../../hooks/apply/useApply";
import ApplyBus from "./applyBus/applyBus";
import ApplyLeave from "./applyLeave/applyLeave";
import ApplyPass from "./applyPass/applyPass";
import ApplyStudyRoom from "./applyStudyrRoom/applyStudyRoom";
import {
  ApplyContainer,
  ApplyFormWrap,
  ApplyTitleIcon,
  ApplyTitleItem,
  ApplyTitleItemWrap,
  ApplyTitleText,
  ApplyTitleWrap,
} from "./style";

const Apply = () => {
  const { section, setSection } = useApply();

  const applyItemComponents: ReactNode[] = [
    <ApplyStudyRoom key="applyStudyRoom" />,
    <ApplyPass key="applyPass" />,
    <ApplyLeave key="applyLeave" />,
    <ApplyBus key="applyBus" />,
  ];

  return (
    <ApplyContainer>
      <ApplyTitleWrap>
        <ApplyTitleIcon>
          <FcSurvey />
        </ApplyTitleIcon>
        <ApplyTitleText>신청</ApplyTitleText>
        <ApplyTitleItemWrap>
          {APPLY_ITEMS.map((item) => (
            <ApplyTitleItem
              isSelect={section === item}
              onClick={() => setSection(item)}
              key={`applyTitleItem ${item}`}
            >
              <span>{item}</span>
            </ApplyTitleItem>
          ))}
        </ApplyTitleItemWrap>
      </ApplyTitleWrap>
      <ApplyFormWrap>
        {applyItemComponents.map((component, idx) => {
          return section === APPLY_ITEMS[idx] && component;
        })}
      </ApplyFormWrap>
    </ApplyContainer>
  );
};

export default Apply;
