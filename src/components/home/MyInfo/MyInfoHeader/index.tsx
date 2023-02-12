import React, { Suspense } from "react";
import dataTransform from "../../../../util/transform/dataTransform";
import * as S from "./style";
import { usePostModuleLogMutation } from "../../../../queries/log/log.query";
import DefaultProfileImage from "../../../../assets/images/common/defaultProfile.png";
import { useGetMyMemberQuery } from "../../../../queries/member/member.query";
import useLogout from "../../../../hooks/auth/useLogout";
import ErrorBoundary from "../../../../components/common/ErrorBoundary";
import MyInfoHeaderFallbackLoader from "../../../../components/common/FallbackLoader/MyInfoHeader";

const MyInfoHeader = () => {
  return (
    <S.MyInfoHeaderWrap>
      <ErrorBoundary fallback={<>에러발생</>}>
        <Suspense fallback={<MyInfoHeaderFallbackLoader />}>
          <MyInfoHeaderForm />
        </Suspense>
      </ErrorBoundary>
    </S.MyInfoHeaderWrap>
  );
};

const MyInfoHeaderForm = () => {
  const { data: serverMyMemberData } = useGetMyMemberQuery({
    suspense: true,
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 5,
  });

  const postModuleLogMutation = usePostModuleLogMutation();

  const redirect = () => {
    postModuleLogMutation.mutate({
      moduleName: "메인",
      description: "메인에서 내정보 페이지로 이동",
    });
    window.location.href = "http://dodam.b1nd.com/myinfo";
  };

  const { logOut } = useLogout();

  return (
    <>
      <S.MyInfoHeaderProfileImg
        src={
          serverMyMemberData?.data.member.profileImage || DefaultProfileImage
        }
        alt="myInfo/profileImg"
        onClick={redirect}
      />
      <S.MyInfoHeaderInfoWrap>
        <S.MyInfoHeaderNameWrap>
          {serverMyMemberData?.data.member.name}
          <S.MyInfoHeaderRedirectText onClick={redirect}>
            내 정보
          </S.MyInfoHeaderRedirectText>
        </S.MyInfoHeaderNameWrap>
        <S.MyInfoHeaderClassWrap>
          {dataTransform.schoolInfoTransform(
            serverMyMemberData?.data?.classroom?.grade || 0,
            serverMyMemberData?.data?.classroom?.room || 0,
            serverMyMemberData?.data?.number || 0
          )}
        </S.MyInfoHeaderClassWrap>
      </S.MyInfoHeaderInfoWrap>
      <S.MyInfoHeaderLogoutButton onClick={logOut}>
        로그아웃
      </S.MyInfoHeaderLogoutButton>
    </>
  );
};

export default React.memo(MyInfoHeader);
