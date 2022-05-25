import { FcSurvey } from "react-icons/fc";
import { APPLY_ITEMS } from "../../../constants/apply/apply.constant";
import useApply from "../../../hooks/apply/useApply";
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
        <ApplyStudyRoom />
      </ApplyFormWrap>
    </ApplyContainer>
  );
};

export default Apply;
