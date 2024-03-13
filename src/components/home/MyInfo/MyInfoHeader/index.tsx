import React, { Suspense } from "react";
import dataTransform from "@src/util/transform/dataTransform";
import * as S from "./style";
import { usePostModuleLogMutation } from "@src/queries/log/log.query";
import DefaultProfileImage from "@src/assets/images/common/defaultProfile.png";
import { useGetMyMemberQuery } from "@src/queries/member/member.query";
import useLogout from "@src/hooks/auth/useLogout";
import MyInfoHeaderFallbackLoader from "@src/components/common/FallbackLoader/MyInfoHeader";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@src/components/common/ErrorFallback";

const MyInfoHeader = () => {
  return (
    <S.MyInfoHeaderWrap>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
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
        src={serverMyMemberData?.data.profileImage || DefaultProfileImage}
        alt="myInfo/profileImg"
        onClick={redirect}
      />
      <S.MyInfoHeaderInfoWrap>
        <S.MyInfoHeaderNameWrap>
          {serverMyMemberData?.data.name}
          <S.MyInfoHeaderRedirectText onClick={redirect}>
            내 정보
          </S.MyInfoHeaderRedirectText>
        </S.MyInfoHeaderNameWrap>
        <S.MyInfoHeaderClassWrap>
          {dataTransform.schoolInfoTransform(
            serverMyMemberData?.data?.student?.grade || 0,
            serverMyMemberData?.data?.student?.room || 0,
            serverMyMemberData?.data?.student?.number || 0
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
