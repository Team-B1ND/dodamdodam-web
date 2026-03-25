import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import type { NightStudyStatus } from "./types";
import { NightStudyApi } from "./api";

export const useGetProjectNightStudyQuery = (status: NightStudyStatus) =>
  useSuspenseInfiniteQuery({
    queryKey: ["my", "project", status],
    queryFn: ({ pageParam }) =>
      NightStudyApi.getProjectNightStudy({ status, page: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });

export const useGetPersonalNightStudyQuery = (status: NightStudyStatus) =>
  useSuspenseInfiniteQuery({
    queryKey: ["my", "personal", status],
    queryFn: ({ pageParam }) =>
      NightStudyApi.getPersonalNightStudy({ status, page: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });
