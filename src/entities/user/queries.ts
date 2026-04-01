import type { ErrorResponse } from "@b1nd/api-client";
import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { redirectToLogin } from "@/shared/utils/redirect-to-login";
import { UserApi } from "./api";

const getMeQueryFn = async () => {
  try {
    return await UserApi.getMe();
  } catch (error) {
    if ((error as ErrorResponse).status === 403) {
      redirectToLogin();
    }

    throw error;
  }
};

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

export const useGetMeSuspenseQuery = () =>
  useSuspenseQuery({
    queryKey: ["user", "my"],
    queryFn: getMeQueryFn,
    staleTime: 1000 * 60 * 5
  });

export const useGetMeQuery = () =>
  useQuery({
    queryKey: ["user", "my"],
    queryFn: getMeQueryFn,
    staleTime: 1000 * 60 * 5
  });
