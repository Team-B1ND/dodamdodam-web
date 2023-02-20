import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { DevEventsResponse } from "@src/types/devEvent/devEvent.type";
import conferenceRepository from "@src/repository/devEvent/devEvent.repository";

export const useGetDevEventsQuery = (
  options?: UseQueryOptions<
    DevEventsResponse,
    AxiosError,
    DevEventsResponse,
    "devEvent/DevEvents"
  >
) =>
  useQuery("devEvent/DevEvents", () => conferenceRepository.getDevEvents(), {
    ...options,
  });
