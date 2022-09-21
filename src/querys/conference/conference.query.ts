import { useQuery } from "react-query";
import conferenceRepository from "../../repository/conference/conference.repository";

export const useGetConferences = () =>
  useQuery(
    "conference/getConferences",
    () => conferenceRepository.getConferences(),
    {
      cacheTime: 1000 * 60 * 60,
      staleTime: 1000 * 60 * 60,
    }
  );
