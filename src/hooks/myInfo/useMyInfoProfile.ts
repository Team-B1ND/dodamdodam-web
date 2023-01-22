import { ACCESS_TOKEN_KEY } from "../../constants/token/token.constant";
import token from "../../lib/token/token";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyMember } from "../../queries/member/member.query";
import { useGetMyPermission } from "../../queries/permission/permission.query";
import showToast from "../../lib/toast/toast";

const useMyInfoProfile = () => {
  const navigate = useNavigate();

  const myMemberData = useGetMyMember({
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 5,
    onError: () => {
      showToast("토큰이 위조 됐습니다", "ERROR");
      token.clearToken();
      navigate("/sign");
    },
  }).data?.data;

  const myPermissionData = useGetMyPermission({
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  }).data?.data;

  useEffect(() => {
    if (token.getToken(ACCESS_TOKEN_KEY) === undefined) {
      navigate("/sign");
    }
  }, [navigate]);

  return { myMemberData, myPermissionData };
};

export default useMyInfoProfile;
