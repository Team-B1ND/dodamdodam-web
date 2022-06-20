import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import profileRepository from "../../repository/profile/profile.repository";
import { MyProfileResponse } from "../../types/profile/profile.type";

export const useGetMyProfile = (
  options?: UseQueryOptions<
    MyProfileResponse,
    AxiosError,
    MyProfileResponse,
    "profile/getMyProfile"
  >
): UseQueryResult<MyProfileResponse, AxiosError> =>
  useQuery(
    "profile/getMyProfile",
    () => profileRepository.getMyProfile(),
    options
  );
