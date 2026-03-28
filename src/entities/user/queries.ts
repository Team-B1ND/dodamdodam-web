import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { UserApi } from "./api";

export const useSearchStudentQuery = (keyword: string) =>
  useSuspenseInfiniteQuery({
    queryKey: ["user", "search", keyword],
    queryFn: ({ pageParam }) =>
      UserApi.searchStudents({ keyword, page: pageParam }),

    initialPageParam: 0,

    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });

export const useGetMeQuery = () => 
  useSuspenseQuery({
    queryKey: ["user", "my"],
    queryFn: UserApi.getMe,
    staleTime: 1000 * 60 * 5
  });