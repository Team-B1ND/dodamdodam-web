import React, { useEffect } from "react";
import MyInfoHeader from "./MyInfoHeader";
import MyInfoWakeupSong from "./MyInfoWakeupSong";
import MyInfoTopImage from "@src/assets/images/myinfo/myInfoTop.svg";
import * as S from "./style";
import { track } from "@amplitude/analytics-browser";

const MyInfo = () => {
  useEffect(() => {
    track("(메인페이지)내 기상송 조회");
  }, []);

  return (
    <S.MyInfoContainer style={{ marginLeft: "auto" }}>
      <S.MyInfoTopIcon src={MyInfoTopImage} alt="myInfo myInfoTopImage" />
      <MyInfoHeader />
      <S.MyInfoListWrap>
        <MyInfoWakeupSong />
      </S.MyInfoListWrap>
    </S.MyInfoContainer>
  );
};

export default React.memo(MyInfo);
