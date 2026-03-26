import { useSuspenseQuery } from "@tanstack/react-query";
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
