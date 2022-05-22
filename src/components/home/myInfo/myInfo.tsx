import React from "react";
import { ReactNode } from "react";
import { MYINFO_ITEMS } from "../../../constants/myInfo/myInfo.constants";
import useMyInfo from "../../../hooks/myInfo/useMyInfo";
import DataTransform from "../../../util/data/transform/dataTransform";
import MyInfoLostStuff from "./myInfoLostStuff/myInfoLostStuff";
import MyInfoNotice from "./myInfoNotice/myInfoNotice";
import MyInfoWakeupSong from "./myInfoWakeupSong/myInfoWakeupSong";
import {
  MyInfoContainer,
  MyInfoHeaderWrap,
  MyInfoHeaderProfileImg,
  MyInfoHeaderInfoWrap,
  MyInfoLogoutButton,
  MyInfoHeaderNameWrap,
  MyInfoHeaderRedirectText,
  MyInfoHeaderClassWrap,
  MyInfoItemsWrap,
  MyInfoItem,
  MyInfoListWrap,
} from "./style";

const MyInfo = () => {
  const { section, setSection, logOut } = useMyInfo();

  const myInfoItemComponents: ReactNode[] = [
    <MyInfoNotice key="myInfoNotice" />,
    <MyInfoWakeupSong key="myInfoWakeupSong" />,
    <MyInfoLostStuff key="myInfoLostStuff" />,
  ];

  return (
    <MyInfoContainer style={{ marginLeft: "auto" }}>
      <MyInfoHeaderWrap>
        <MyInfoHeaderProfileImg
          src={"http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"}
          alt="myInfo/profileImg"
        />
        <MyInfoHeaderInfoWrap>
          <MyInfoHeaderNameWrap>
            임동현
            <MyInfoHeaderRedirectText>내 정보</MyInfoHeaderRedirectText>
          </MyInfoHeaderNameWrap>
          <MyInfoHeaderClassWrap>
            {DataTransform.schoolInfoTransform("2", "1", "17")}
          </MyInfoHeaderClassWrap>
        </MyInfoHeaderInfoWrap>
        <MyInfoLogoutButton onClick={logOut}>로그아웃</MyInfoLogoutButton>
      </MyInfoHeaderWrap>
      <MyInfoItemsWrap>
        {MYINFO_ITEMS.map((item) => (
          <MyInfoItem
            onClick={() => setSection(item)}
            isSelect={section === item}
          >
            {item}
          </MyInfoItem>
        ))}
      </MyInfoItemsWrap>
      <MyInfoListWrap>
        {myInfoItemComponents.map((component, idx) => {
          return section === MYINFO_ITEMS[idx] && component;
        })}
      </MyInfoListWrap>
    </MyInfoContainer>
  );
};

export default React.memo(MyInfo);
