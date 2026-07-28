import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { TeamApi } from "./api";

export const useGetMyTeamsQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["team", "my"],
    queryFn: ({ pageParam }) => TeamApi.getMyTeams({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.data.hasNext ? lastPageParam + 1 : undefined,
  });
