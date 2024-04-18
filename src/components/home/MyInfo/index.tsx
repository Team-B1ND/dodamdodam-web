import React from "react";
import MyInfoHeader from "./MyInfoHeader";
import MyInfoWakeupSong from "./MyInfoWakeupSong";
import MyInfoTopImage from "@src/assets/images/myinfo/myInfoTop.svg";
import * as S from "./style";

const MyInfo = () => {
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
