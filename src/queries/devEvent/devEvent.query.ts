import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { DevEventsResponse } from "@src/types/devEvent/devEvent.type";
import conferenceRepository from "@src/repository/devEvent/devEvent.repository";
import { QUERY_KEYS } from "../queryKey";

export const useGetDevEventsQuery = (
  options?: UseQueryOptions<
    DevEventsResponse,
    AxiosError,
    DevEventsResponse,
    string
  >
) =>
  useQuery(QUERY_KEYS.devEvent.get, () => conferenceRepository.getDevEvents(), {
    ...options,
  });
