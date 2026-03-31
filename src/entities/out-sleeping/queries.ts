import { OutSleepingApi } from "@/entities/out-sleeping/api";
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useGetMyOutSleepingQuery = () =>
  useSuspenseQuery({
    queryKey: ["out-sleeping", "my"],
    queryFn: OutSleepingApi.getMyOutSleeping,
    staleTime: 1000 * 60 * 5,
  });

export const useGetOutSleepingApplications = (date: string) =>
  useSuspenseInfiniteQuery({
    queryKey: ["out-sleeping", "applications", date],
    queryFn: ({ pageParam }) =>
      OutSleepingApi.getOutSleepingApplications({ date, page: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });
