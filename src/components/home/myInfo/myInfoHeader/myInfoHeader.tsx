import useMyInfoProfile from "../../../../hooks/myInfo/useMyInfoProfile";
import React from "react";
import dataTransform from "../../../../util/transform/dataTransform";
import * as S from "./style";
import { usePostModuleLog } from "../../../../querys/log/log.query";
import DefaultProfileImage from "../../../../assets/images/common/defaultProfile.png";

interface Props {
  logOut: () => void;
}

const MyInfoHeader = ({ logOut }: Props) => {
  const { myMemberData } = useMyInfoProfile();
  const postModuleLogMutation = usePostModuleLog();

  const redirect = () => {
    postModuleLogMutation.mutate({
      moduleName: "메인",
      description: "메인에서 내정보 페이지로 이동",
    });
    window.location.href = "http://dodam.b1nd.com/myinfo";
  };

  return (
    <S.MyInfoHeaderWrap>
      <S.MyInfoHeaderProfileImg
        src={myMemberData?.member.profileImage || DefaultProfileImage}
        alt="myInfo/profileImg"
        onClick={redirect}
      />
      <S.MyInfoHeaderInfoWrap>
        <S.MyInfoHeaderNameWrap>
          {myMemberData?.member.name}
          <S.MyInfoHeaderRedirectText onClick={redirect}>
            내 정보
          </S.MyInfoHeaderRedirectText>
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
