import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { TeamApi } from "./api";

export const useGetTeamsQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["team"],
    queryFn: ({ pageParam }) => TeamApi.getTeams({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.data.hasNext ? lastPageParam + 1 : undefined,
  });

export const useGetMyTeamsQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["team", "my"],
    queryFn: ({ pageParam }) => TeamApi.getMyTeams({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.data.hasNext ? lastPageParam + 1 : undefined,
  });
  
export const useGetTeamMembersQuery = (publicId: string) =>
  useSuspenseQuery({
    queryKey: ["team", publicId, "members"],
    queryFn: () => TeamApi.getTeamMembers(publicId),
  });

export const useGetMyInvitationsQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["team", "invite", "my"],
    queryFn: ({ pageParam }) =>
      TeamApi.getMyInvitations({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.data.hasNext ? lastPageParam + 1 : undefined,
  });

