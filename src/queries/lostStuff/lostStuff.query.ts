import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import lostStuffRepository from "../../repository/lostStuff/lostStuff.repository";
import { MyLostStuffsResponse } from "../../types/lostStuff/lostStuff.type";

export const useGetMyLostStuffQuery = (
  options?: UseQueryOptions<
    MyLostStuffsResponse,
    AxiosError,
    MyLostStuffsResponse,
    "lostStuff/getMyLostStuff"
  >
): UseQueryResult<MyLostStuffsResponse, AxiosError> =>
  useQuery(
    "lostStuff/getMyLostStuff",
    () => lostStuffRepository.getMyLostStuffs(),
    options
  );
