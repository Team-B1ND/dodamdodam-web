import React from "react";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";
import { MYINFO_ITEMS } from "../../../constants/myInfo/myInfo.constants";
import useMyInfo from "../../../hooks/myInfo/useMyInfo";
import { profileAtom } from "../../../store/profile/profileStore";
import DataTransform from "../../../util/data/transform/dataTransform";
import MyInfoLostStuff from "./myInfoLostStuff/myInfoLostStuff";
import MyInfoNotice from "./myInfoNotice/myInfoNotice";
import MyInfoWakeupSong from "./myInfoWakeupSong/myInfoWakeupSong";
import * as S from "./style";

const MyInfo = () => {
  const { section, setSection, logOut } = useMyInfo();
  const profileData = useRecoilValue(profileAtom);

  const myInfoItemComponents: ReactNode[] = [
    <MyInfoNotice key="myInfoNotice" />,
    <MyInfoWakeupSong key="myInfoWakeupSong" />,
    <MyInfoLostStuff key="myInfoLostStuff" />,
  ];

  return (
    <S.MyInfoContainer style={{ marginLeft: "auto" }}>
      <S.MyInfoHeaderWrap>
        <S.MyInfoHeaderProfileImg
          src={"http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"}
          alt="myInfo/profileImg"
        />
        <S.MyInfoHeaderInfoWrap>
          <S.MyInfoHeaderNameWrap>
            {profileData.name}
            <S.MyInfoHeaderRedirectText>내 정보</S.MyInfoHeaderRedirectText>
          </S.MyInfoHeaderNameWrap>
          <S.MyInfoHeaderClassWrap>
            {DataTransform.schoolInfoTransform(
              profileData.grade,
              profileData.room,
              profileData.number
            )}
          </S.MyInfoHeaderClassWrap>
        </S.MyInfoHeaderInfoWrap>
        <S.MyInfoLogoutButton onClick={logOut}>로그아웃</S.MyInfoLogoutButton>
      </S.MyInfoHeaderWrap>
      <S.MyInfoItemsWrap>
        {MYINFO_ITEMS.map((item) => (
          <S.MyInfoItem
            onClick={() => setSection(item)}
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
