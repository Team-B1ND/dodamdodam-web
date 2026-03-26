import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { NightStudyApi } from "./api";

export const useGetProjectNightStudyQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["my", "project"],
    queryFn: ({ pageParam }) =>
      NightStudyApi.getProjectNightStudy({ page: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });

export const useGetPersonalNightStudyQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["my", "personal"],
    queryFn: ({ pageParam }) =>
      NightStudyApi.getPersonalNightStudy({ page: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });
