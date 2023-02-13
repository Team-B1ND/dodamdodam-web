import React, { useState } from "react";
import { MYINFO_ITEMS } from "../../../constants/myInfo/myInfo.constants";
import MyInfoHeader from "./MyInfoHeader";
import MyInfoLostStuff from "./MyInfoLostStuff";
import MyInfoWakeupSong from "./MyInfoWakeupSong";
import MyInfoTopImage from "../../../assets/images/myinfo/myInfoTop.svg";
import * as S from "./style";
import { track } from "@amplitude/analytics-browser";
import { SwitchCase } from "@b1nd/b1nd-react-util";

const MyInfo = () => {
  const [section, setSection] = useState("기상송");

  return (
    <S.MyInfoContainer style={{ marginLeft: "auto" }}>
      <S.MyInfoTopIcon src={MyInfoTopImage} alt="myInfo myInfoTopImage" />
      <MyInfoHeader />
      <S.MyInfoItemsWrap>
        {MYINFO_ITEMS.map((item) => (
          <S.MyInfoItem
            onClick={() => {
              setSection(item);
              track(`(메인페이지)내 ${item}조회`);
            }}
            isSelect={section === item}
            key={`myinfoItem ${item}`}
          >
            {item}
          </S.MyInfoItem>
        ))}
      </S.MyInfoItemsWrap>
      <S.MyInfoListWrap>
        <SwitchCase
          value={section}
          caseBy={{
            기상송: <MyInfoWakeupSong />,
            분실물: <MyInfoLostStuff />,
          }}
        />
      </S.MyInfoListWrap>
    </S.MyInfoContainer>
  );
};

export default React.memo(MyInfo);
