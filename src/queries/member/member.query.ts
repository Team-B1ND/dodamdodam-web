import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { MyMemberResponse } from "../../types/member/member.type";
import profileRepository from "../../repository/member/member.repository";

export const useGetMyMember = (
  options?: UseQueryOptions<
    MyMemberResponse,
    AxiosError,
    MyMemberResponse,
    "profile/getMyMember"
  >
): UseQueryResult<MyMemberResponse, AxiosError> =>
  useQuery(
    "profile/getMyMember",
    () => profileRepository.getMyMember(),
    options
  );
