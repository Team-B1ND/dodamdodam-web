import { AxiosError } from "axios";
import { useQuery, UseQueryOptions } from "react-query";
import { DevEventsResponse } from "../../types/devEvent/devEvent.type";
import conferenceRepository from "../../repository/devEvent/devEvent.repository";

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
