import { useQuery } from "react-query";
import conferenceRepository from "../../repository/devEvent/devEvent.repository";

export const useGetDevEvents = () =>
  useQuery("devEvent/DevEvents", () => conferenceRepository.getDevEvents(), {
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
