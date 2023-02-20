import { AxiosError } from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import lostStuffRepository from "@src/repository/lostStuff/lostStuff.repository";
import { MyLostStuffsResponse } from "@src/types/lostStuff/lostStuff.type";
import { QUERY_KEYS } from "../queryKey";

export const useGetMyLostStuffQuery = (
  options?: UseQueryOptions<
    MyLostStuffsResponse,
    AxiosError,
    MyLostStuffsResponse,
    string
  >
): UseQueryResult<MyLostStuffsResponse, AxiosError> =>
  useQuery(
    QUERY_KEYS.lostStuff.getMy,
    () => lostStuffRepository.getMyLostStuffs(),
    options
  );
