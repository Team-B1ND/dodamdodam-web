import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { NightStudyApi } from "./api";

export const useGetProjectNightStudyQuery = () =>
  useSuspenseQuery({
    queryKey: ["my", "project"],
    queryFn: NightStudyApi.getProjectNightStudy,
  });

export const useGetPersonalNightStudyQuery = () =>
  useSuspenseQuery({
    queryKey: ["my", "personal"],
    queryFn: NightStudyApi.getPersonalNightStudy,
  });

export const useGetBanStatusQuery = () =>
  useSuspenseQuery({
    queryKey: ["ban", "my"],
    queryFn: NightStudyApi.getBanStatus,
    staleTime: 1000 * 60 * 60 * 24,
  });

export const useGetPersonalApplicationsQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["nightstudy", "applications", "personal"],
    queryFn: ({ pageParam }) =>
      NightStudyApi.getPersonalApplications({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });

export const useGetProjectApplicationsQuery = () =>
  useSuspenseInfiniteQuery({
    queryKey: ["nightstudy", "applications", "project"],
    queryFn: ({ pageParam }) =>
      NightStudyApi.getProjectApplications({ page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (!lastPage.data.hasNext) return undefined;
      return lastPageParam + 1;
    },
  });

export const useGetRoomsQuery = () =>
  useSuspenseQuery({
    queryKey: ["nightstudy", "rooms"],
    queryFn: NightStudyApi.getRooms,
  });

export const useGetBanListQuery = () =>
  useSuspenseQuery({
    queryKey: ["nightstudy", "bans"],
    queryFn: NightStudyApi.getBanList,
  });
