import type { ErrorResponse } from "@b1nd/api-client";
import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery, type QueryFunctionContext } from "@tanstack/react-query";
import { redirectToLogin } from "@/shared/utils/redirect-to-login";
import { UserApi } from "./api";
import type { SearchUserParams } from "@/entities/user/types";
import { resetApiClient } from "@/shared/libs/api-client";

const getMeQueryFn = async ({ signal }: QueryFunctionContext) => {
  try {
    return await UserApi.getMe(signal);
  } catch (error) {
    const status = (error as ErrorResponse).status;
    if (!signal.aborted && (status === 401 || status === 403)) {
      resetApiClient();
      redirectToLogin();
    }

    throw error;
  }
};

const retryGetMe = (failureCount: number, error: unknown) => {
  const status = (error as ErrorResponse).status;
  return status !== 401 && status !== 403 && failureCount < 3;
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

export const useSearchUserQuery = ({
  keyword,
  roles,
  generationOnly,
  status,
}: Omit<SearchUserParams, "page">) =>
  useSuspenseInfiniteQuery({
    queryKey: ["user", "search", keyword, roles, generationOnly, status],
    queryFn: ({ pageParam }) =>
      UserApi.searchUser({
        keyword,
        roles,
        generationOnly,
        status,
        page: pageParam,
      }),
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
    retry: retryGetMe,
    staleTime: 1000 * 60 * 5
  });

export const useGetMeQuery = (enabled = true) =>
  useQuery({
    queryKey: ["user", "my"],
    queryFn: getMeQueryFn,
    enabled,
    retry: retryGetMe,
    staleTime: 1000 * 60 * 5
  });
