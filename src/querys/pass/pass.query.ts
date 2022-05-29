import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { getMyPassesParam } from "../../repository/pass/pass.param";
import passRepository from "../../repository/pass/pass.repository";
import { MyPassesResponse } from "../../types/pass/pass.type";

export const useGetMyPasses = (
  { date }: getMyPassesParam,
  options?: UseQueryOptions<
    MyPassesResponse,
    AxiosError,
    MyPassesResponse,
    "pass/getMyPasses"
  >
): UseQueryResult<MyPassesResponse, AxiosError> =>
  useQuery(
    "pass/getMyPasses",
    () => passRepository.getMyPasses({ date }),
    options
  );
