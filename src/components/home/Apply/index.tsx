import { useState } from "react";
import { APPLY_ITEMS } from "@src/constants/apply/apply.constant";
import ApplyBus from "./ApplyBus";
import ApplyLeave from "./ApplyLeave";
import ApplyPass from "./ApplyPass";
import ApplyStudyRoom from "./ApplyStudyrRoom";
import * as S from "./style";
import ApplyMemo from "@src/assets/icons/apply/applyMemo.png";
import { SwitchCase } from "@b1nd/b1nd-react-util";

const Apply = () => {
  const [section, setSection] = useState("자습실");

  return (
    <S.ApplyContainer>
      <S.ApplyTitleWrap>
        <S.ApplyTitleIcon src={ApplyMemo} />
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
        <SwitchCase
          value={section}
          caseBy={{
            자습실: <ApplyStudyRoom />,
            외출: <ApplyPass />,
            외박: <ApplyLeave />,
            버스: <ApplyBus />,
          }}
        />
      </S.ApplyFormWrap>
    </S.ApplyContainer>
  );
};

export default Apply;
