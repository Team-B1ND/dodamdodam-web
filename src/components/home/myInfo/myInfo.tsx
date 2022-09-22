import React from "react";
import { ReactNode } from "react";
import { MYINFO_ITEMS } from "../../../constants/myInfo/myInfo.constants";
import useMyInfo from "../../../hooks/myInfo/useMyInfo";
import MyInfoHeader from "./myInfoHeader/myInfoHeader";
import MyInfoLostStuff from "./myInfoLostStuff/myInfoLostStuff";
import MyInfoWakeupSong from "./myInfoWakeupSong/myInfoWakeupSong";
import MyInfoTopImage from "../../../assets/images/myinfo/myInfoTop.svg";
import * as S from "./style";
import { track } from "@amplitude/analytics-browser";

const MyInfo = () => {
  const { section, setSection, logOut } = useMyInfo();

  const myInfoItemComponents: ReactNode[] = [
    <MyInfoWakeupSong key="myInfoWakeupSong" />,
    <MyInfoLostStuff key="myInfoLostStuff" />,
  ];

  return (
    <S.MyInfoContainer style={{ marginLeft: "auto" }}>
      <S.MyInfoTopIcon src={MyInfoTopImage} alt="myInfo myInfoTopImage" />
      <MyInfoHeader logOut={logOut} />
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
        {myInfoItemComponents.map((component, idx) => {
          return section === MYINFO_ITEMS[idx] && component;
        })}
      </S.MyInfoListWrap>
    </S.MyInfoContainer>
  );
};

export default React.memo(MyInfo);
