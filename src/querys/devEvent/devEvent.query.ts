import { useQuery } from "react-query";
import conferenceRepository from "../../repository/conference/conference.repository";

export const useGetDevEvents = () =>
  useQuery("devEvent/DevEvents", () => conferenceRepository.getDevEvents(), {
    cacheTime: 1000 * 60 * 60,
    staleTime: 1000 * 60 * 60,
  });
