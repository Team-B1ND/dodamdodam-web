import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { MyMemberResponse } from "@src/types/member/member.type";
import profileRepository from "@src/repository/member/member.repository";
import { B1ndToast } from "@b1nd/b1nd-toastify";
import token from "@src/lib/token/token";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyMemberQuery = (
  options?: UseQueryOptions<
    MyMemberResponse,
    AxiosError,
    MyMemberResponse,
    string
  >
): UseQueryResult<MyMemberResponse, AxiosError> =>
  useQuery(QUERY_KEYS.member.getMy, () => profileRepository.getMyMember(), {
    ...options,
    onError: () => {
      B1ndToast.showError("토큰이 위조 됐습니다");
      token.clearToken();
      window.location.href = "/sign";
    },
  });
