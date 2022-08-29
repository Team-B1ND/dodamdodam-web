import useMyInfoProfile from "../../../../hooks/myInfo/useMyInfoProfile";
import React from "react";
import dataTransform from "../../../../util/transform/dataTransform";
import * as S from "./style";

interface Props {
  logOut: () => void;
}

const MyInfoHeader = ({ logOut }: Props) => {
  const { myMemberData } = useMyInfoProfile();

  return (
    <S.MyInfoHeaderWrap>
      <S.MyInfoHeaderProfileImg
        src={"http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"}
        alt="myInfo/profileImg"
      />
      <S.MyInfoHeaderInfoWrap>
        <S.MyInfoHeaderNameWrap>
          {myMemberData?.member.name}
          <S.MyInfoHeaderRedirectText>내 정보</S.MyInfoHeaderRedirectText>
        </S.MyInfoHeaderNameWrap>
        <S.MyInfoHeaderClassWrap>
          {dataTransform.schoolInfoTransform(
            myMemberData?.classroom?.grade || 0,
            myMemberData?.classroom?.room || 0,
            myMemberData?.number || 0
          )}
        </S.MyInfoHeaderClassWrap>
      </S.MyInfoHeaderInfoWrap>
      <S.MyInfoHeaderLogoutButton onClick={logOut}>
        로그아웃
      </S.MyInfoHeaderLogoutButton>
    </S.MyInfoHeaderWrap>
  );
};

export default React.memo(MyInfoHeader);
